const LeadUtils = require('../assets/js/lead-utils.js');

const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MIN_SUBMIT_MS = 2500;
const DEFAULT_WEBHOOK_URL = 'https://daon1019.com/webhook/addscapcokr';
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
  const inquiryForm = sanitizeOptionalString(body.inquiryForm, 80);
  const source = sanitizeOptionalString(body.source, 80) || 'landing';
  const formVariant = sanitizeOptionalString(body.formVariant, 80) || 'unknown_form';
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
      formVariant,
      inquiryForm,
      isDuplicate: Boolean(body.isDuplicate),
      marketingConsent: Boolean(consents.marketing),
      name,
      phone,
      sessionDurationMs,
      source
    }
  };
}

function createKstTimestamp() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().replace('Z', '+09:00');
}

function buildLeadPayload(submission) {
  return {
    name: submission.name,
    phone: LeadUtils.formatPhoneInputValue(submission.phone),
    source: submission.source,
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
    device_type: submission.adData.device_type,
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
  const webhookUrl = env.LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

  if (!webhookUrl) {
    return { delivered: false, skipped: true };
  }

  const body = new FormData();
  body.append('name', submission.name);
  body.append('phone', LeadUtils.formatPhoneInputValue(submission.phone));
  body.append('source', submission.source);
  body.append('status', 'New');
  body.append('inquiry_form', submission.inquiryForm);
  body.append('created_at', createKstTimestamp());
  body.append('sort', submission.inquiryForm);
  body.append('ip', requestIp);

  const response = await fetchImpl(webhookUrl, {
    method: 'POST',
    body
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Webhook delivery failed: ${message.slice(0, 500)}`);
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

  try {
    const body = await readJsonBody(req);
    const { errors, value } = validateLeadRequest(body);

    if (errors && errors.length > 0) {
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
      console.error(error);
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
    sendJson(res, 500, {
      message: 'Unable to process the submission right now.',
      ok: false
    });
  }
}

module.exports = {
  buildLeadPayload,
  getAllowedOrigins,
  handleLeadRequest,
  isAllowedOrigin,
  validateLeadRequest
};
