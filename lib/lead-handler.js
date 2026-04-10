const crypto = require('crypto');
const LeadUtils = require('../assets/js/lead-utils.js');

const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MIN_SUBMIT_MS = 800;

const rateLimitStore = new Map();

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  let rawBody = '';

  for await (const chunk of req) {
    rawBody += chunk;

    if (rawBody.length > 32_768) {
      throw new Error('Request body too large');
    }
  }

  return rawBody ? JSON.parse(rawBody) : {};
}

function getRequestIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

function parseCsv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getAllowedOrigins(req, env) {
  const configuredOrigins = parseCsv(env.ALLOWED_ORIGINS);

  if (configuredOrigins.length > 0) {
    return configuredOrigins;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const forwardedProto = req.headers['x-forwarded-proto'];

  if (!host) {
    return [];
  }

  const origins = new Set([
    `https://${host}`,
    `http://${host}`
  ]);

  if (typeof forwardedProto === 'string' && forwardedProto.trim()) {
    origins.add(`${forwardedProto}://${host}`);
  }

  return [...origins];
}

function isAllowedOrigin(req, env) {
  const origin = req.headers.origin;

  if (!origin) {
    return true;
  }

  return getAllowedOrigins(req, env).includes(origin);
}

function checkRateLimit(store, key, now, maxRequests, windowMs) {
  const timestamps = (store.get(key) || []).filter((timestamp) => now - timestamp < windowMs);

  if (timestamps.length === 0) {
    store.delete(key);
    return true;
  }

  if (timestamps.length >= maxRequests) {
    store.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return true;
}

function sanitizeOptionalString(value, maxLength) {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  return trimmed.slice(0, maxLength);
}

function sanitizeAdData(adData) {
  const source = adData && typeof adData === 'object' && !Array.isArray(adData) ? adData : {};

  return {
    gclid: sanitizeOptionalString(source.gclid, 120),
    gbraid: sanitizeOptionalString(source.gbraid, 120),
    wbraid: sanitizeOptionalString(source.wbraid, 120),
    utm_source: sanitizeOptionalString(source.utm_source, 120),
    utm_medium: sanitizeOptionalString(source.utm_medium, 120),
    utm_campaign: sanitizeOptionalString(source.utm_campaign, 160),
    utm_term: sanitizeOptionalString(source.utm_term, 160),
    utm_content: sanitizeOptionalString(source.utm_content, 160),
    referrer: sanitizeOptionalString(source.referrer, 500),
    landing_url: sanitizeOptionalString(source.landing_url, 500),
    device_type: sanitizeOptionalString(source.device_type, 40)
  };
}

function deriveCampaignAttribution(adData) {
  const campaign = String(adData?.utm_campaign || '').toLowerCase();
  const content = String(adData?.utm_content || '').toLowerCase();
  const medium = String(adData?.utm_medium || '').toLowerCase();
  const term = String(adData?.utm_term || '').trim();

  let campaignChannel = 'UNKNOWN';

  if (
    campaign.includes('pmax') ||
    campaign.includes('performance_max') ||
    campaign.includes('performance max') ||
    content.includes('pmax') ||
    content.includes('performance_max') ||
    content.includes('performance max')
  ) {
    campaignChannel = 'PMAX';
  } else if (
    campaign.includes('sa') ||
    campaign.includes('search') ||
    content.includes('sa') ||
    content.includes('search') ||
    term
  ) {
    campaignChannel = 'SA';
  }

  const isGoogleAds =
    medium === 'cpc' ||
    Boolean(adData?.gclid) ||
    Boolean(adData?.gbraid) ||
    Boolean(adData?.wbraid) ||
    String(adData?.utm_source || '').toLowerCase() === 'google';

  const adPlatform = isGoogleAds ? 'GOOGLE_ADS' : 'UNKNOWN';
  const campaignName = adData?.utm_campaign || null;
  const trafficLabel = campaignChannel === 'UNKNOWN'
    ? adPlatform
    : `${adPlatform} | ${campaignChannel}`;

  return {
    adPlatform,
    campaignChannel,
    campaignName,
    trafficLabel
  };
}

function sanitizeSessionDurationMs(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric) || numeric < 0) {
    return null;
  }

  return Math.round(numeric);
}

function validateLeadRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { errors: ['Invalid request body.'] };
  }

  const errors = [];
  const name = sanitizeOptionalString(body.name, 40);
  const phone = LeadUtils.normalizePhone(body.phone);
  const businessName = sanitizeOptionalString(body.businessName, 120);
  const inquiryForm = sanitizeOptionalString(body.inquiryForm, 80);
  const source = sanitizeOptionalString(body.source, 80) || 'landing';
  const formVariant = sanitizeOptionalString(body.formVariant, 80) || 'unknown_form';
  const amount = sanitizeOptionalString(body.amount, 80);
  const inquiry = sanitizeOptionalString(body.inquiry, 1000);
  const honeypot = sanitizeOptionalString(body.website || body.honeypot, 120) || '';
  const sessionDurationMs = sanitizeSessionDurationMs(body.sessionDurationMs);
  const consents = body.consents && typeof body.consents === 'object' ? body.consents : {};

  if (!name) {
    errors.push('Name is required.');
  }

  if (name && !LeadUtils.isLikelyValidLeadName(name)) {
    errors.push('Valid name is required.');
  }

  if (!LeadUtils.isValidPhone(phone)) {
    errors.push('Valid phone number is required.');
  }

  if (LeadUtils.isObviouslyFakeKoreanMobile(phone)) {
    errors.push('Fake phone number is not allowed.');
  }

  if (!inquiryForm) {
    errors.push('Loan type is required.');
  }

  if (!consents.privacy || !consents.thirdParty) {
    errors.push('Required consent is missing.');
  }

  if (honeypot) {
    errors.push('Spam submission detected.');
  }

  if (sessionDurationMs !== null && sessionDurationMs < DEFAULT_MIN_SUBMIT_MS) {
    errors.push('Submission completed too quickly.');
  }

  return {
    errors,
    value: {
      adData: sanitizeAdData(body.adData),
      attribution: deriveCampaignAttribution(sanitizeAdData(body.adData)),
      formVariant,
      inquiryForm,
      isDuplicate: Boolean(body.isDuplicate),
      marketingConsent: Boolean(consents.marketing),
      name,
      phone,
      businessName,
      amount,
      inquiry,
      sessionDurationMs,
      source
    }
  };
}

function createKstTimestamp() {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T') + '+09:00';
}

function buildLeadPayload(submission) {
  const sourceLabel = submission.attribution?.campaignChannel && submission.attribution.campaignChannel !== 'UNKNOWN'
    ? `${submission.source} | ${submission.attribution.trafficLabel}`
    : submission.source;

  return {
    name: submission.name,
    phone: LeadUtils.formatPhoneInputValue(submission.phone),
    business_name: submission.businessName,
    business_number: submission.businessNumber,
    source: sourceLabel,
    status: 'New',
    inquiry_form: submission.inquiryForm,
    created_at: createKstTimestamp(),
    gclid: submission.adData.gclid,
    gbraid: submission.adData.gbraid,
    wbraid: submission.adData.wbraid,
    utm_source: submission.adData.utm_source,
    utm_medium: submission.adData.utm_medium,
    utm_campaign: submission.adData.utm_campaign,
    utm_term: submission.adData.utm_term,
    utm_content: submission.adData.utm_content,
    referrer: submission.adData.referrer,
    landing_url: submission.adData.landing_url,
    form_variant: submission.formVariant,
    is_duplicate: submission.isDuplicate
  };
}

async function insertLead(payload, env, fetchImpl) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Lead API is not configured.');
  }

  const response = await fetchImpl(`${env.SUPABASE_URL}/rest/v1/lead`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify([payload])
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase insert failed: ${message.slice(0, 500)}`);
  }
}

async function deliverWebhook(submission, requestIp, env, fetchImpl) {
  // 사용자가 요청한 두 개의 웹훅 주소로 동시 전송
  const webhookUrls = [
    env.LEAD_WEBHOOK_URL,
    env.LEAD_WEBHOOK_TEST_URL
  ].filter(Boolean);

  const body = new FormData();
  body.append('name', submission.name);
  body.append('phone', LeadUtils.formatPhoneInputValue(submission.phone));
  body.append('business_name', submission.businessName || '');
  body.append('source', submission.source);
  body.append('campaign_channel', submission.attribution?.campaignChannel || 'UNKNOWN');
  body.append('traffic_label', submission.attribution?.trafficLabel || 'UNKNOWN');
  body.append('campaign_name', submission.attribution?.campaignName || '');
  body.append('status', 'New');
  body.append('inquiry_form', submission.inquiryForm);
  body.append('created_at', createKstTimestamp());
  body.append('sort', submission.inquiryForm);
  body.append('ip', requestIp);
  
  if (submission.amount) body.append('amount', submission.amount);
  if (submission.inquiry) body.append('inquiry', submission.inquiry);
  
  // 숨겨져 있던 광고 및 유입 추적 데이터 웹훅으로 모두 전송
  if (submission.adData) {
    body.append('landing_url', submission.adData.landing_url || '');
    body.append('referrer', submission.adData.referrer || '');
    body.append('utm_source', submission.adData.utm_source || '');
    body.append('utm_medium', submission.adData.utm_medium || '');
    body.append('utm_campaign', submission.adData.utm_campaign || '');
    body.append('utm_term', submission.adData.utm_term || '');
    body.append('utm_content', submission.adData.utm_content || '');
    body.append('gclid', submission.adData.gclid || '');
    body.append('gbraid', submission.adData.gbraid || '');
    body.append('wbraid', submission.adData.wbraid || '');
  }
  body.append('is_duplicate', submission.isDuplicate ? 'true' : 'false');

  // Promise.allSettled를 통해 두 웹훅에 동시(병렬) 전송하고, 하나가 실패해도 다른 하나에 영향을 주지 않도록 처리
  const promises = webhookUrls.map(async (url) => {
    const response = await fetchImpl(url, {
      method: 'POST',
      body
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Webhook delivery failed for ${url}: ${message.slice(0, 500)}`);
    }
  });

  await Promise.allSettled(promises);

  return { delivered: true };
}

// [추가] 메타 전환 API(CAPI) 전송 함수
async function deliverMetaCAPI(submission, req, env, fetchImpl) {
  const accessToken = env.META_CAPI_ACCESS_TOKEN;
  const pixelId = env.META_PIXEL_ID || '1980194052630383';

  if (!accessToken || !pixelId) return { delivered: false, skipped: true };

  // 전화번호 포맷팅: 숫자만 남기고, 010을 8210으로 (메타 권장 국제번호 형식)
  const rawPhone = String(submission.phone || '').replace(/[^0-9]/g, '');
  const metaFormattedPhone = rawPhone.startsWith('0') ? `82${rawPhone.slice(1)}` : rawPhone;
  
  // 메타 권장 SHA-256 해싱
  const hash = (value) => value ? crypto.createHash('sha256').update(value).digest('hex') : undefined;

  const hashedPhone = hash(metaFormattedPhone);
  const hashedName = hash(String(submission.name || '').trim().toLowerCase());

  const clientIp = getRequestIp(req);
  const userAgent = req.headers['user-agent'] || '';

  // 쿠키 추출 (fbp, fbc) - 프론트에서 넘어왔다면 적극 활용
  const cookieHeader = req.headers.cookie || '';
  let fbp, fbc;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const key = parts.shift().trim();
    if (key === '_fbp') fbp = decodeURI(parts.join('='));
    if (key === '_fbc') fbc = decodeURI(parts.join('='));
  });

  const payload = {
    ...(env.META_TEST_EVENT_CODE ? { test_event_code: env.META_TEST_EVENT_CODE } : {}),
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: submission.adData?.landing_url || 'https://daon1019.com',
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          ph: hashedPhone ? [hashedPhone] : undefined,
          fn: hashedName ? [hashedName] : undefined,
          fbp: fbp || undefined,
          fbc: fbc || undefined
        },
        custom_data: {
          lead_type: submission.inquiryForm
        }
      }
    ]
  };

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await response.text();
    console.error(`Meta CAPI error: ${message}`);
    throw new Error(`Meta CAPI delivery failed: ${message.slice(0, 500)}`);
  }

  return { delivered: true };
}

async function handleLeadRequest(req, res, options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetchImpl || fetch;
  const store = options.rateLimitStore || rateLimitStore;

  if (req.method !== 'POST') {
    sendJson(res, 405, { message: 'Method not allowed.', ok: false });
    return;
  }

  if (!isAllowedOrigin(req, env)) {
    sendJson(res, 403, { message: 'Forbidden origin.', ok: false });
    return;
  }

  const requestIp = getRequestIp(req);
  const now = Date.now();
  const maxRequests = Number(env.LEAD_RATE_LIMIT_MAX || DEFAULT_RATE_LIMIT_MAX);
  const windowMs = Number(env.LEAD_RATE_LIMIT_WINDOW_MS || DEFAULT_RATE_LIMIT_WINDOW_MS);

  if (!checkRateLimit(store, requestIp, now, maxRequests, windowMs)) {
    sendJson(res, 429, { message: 'Too many submissions. Please try again later.', ok: false });
    return;
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    sendJson(res, 500, {
      message: 'Lead API is not configured.',
      ok: false
    });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const { errors, value } = validateLeadRequest(body);

    if (errors && errors.length > 0) {
      console.error('Validation Errors:', errors);
      sendJson(res, 400, { message: errors[0], ok: false });
      return;
    }

    const leadPayload = buildLeadPayload(value);
    await insertLead(leadPayload, env, fetchImpl);

    let webhookDelivered = true;

    try {
      await deliverWebhook(value, requestIp, env, fetchImpl);
    } catch (error) {
      webhookDelivered = false;
      console.error('Webhook Error:', error);
    }

    // [추가] CAPI 전송 실행
    try {
      await deliverMetaCAPI(value, req, env, fetchImpl);
      console.log('Meta CAPI Lead event delivered successfully.');
    } catch (error) {
      // CAPI 전송 실패가 메인 응답(201)을 망치지 않도록 catch만 함
      console.error('Meta CAPI Error:', error);
    }

    sendJson(res, 201, {
      ok: true,
      displayData: LeadUtils.createSafeCompleteData({
        name: value.name,
        phone: value.phone,
        type: value.inquiryForm
      }),
      webhookDelivered
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error && error.message
      ? error.message
      : 'Unable to process the submission right now.';
    sendJson(res, 500, {
      message,
      ok: false
    });
  }
}

module.exports = {
  buildLeadPayload,
  deriveCampaignAttribution,
  getAllowedOrigins,
  handleLeadRequest,
  isAllowedOrigin,
  validateLeadRequest
};
