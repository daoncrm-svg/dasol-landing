const test = require('node:test');
const assert = require('node:assert/strict');

const { buildLeadPayload, deriveCampaignAttribution, validateLeadRequest } = require('../lib/lead-handler.js');

test('validates a complete lead submission body', () => {
  const result = validateLeadRequest({
    name: '홍길동',
    phone: '010-9876-5432',
    inquiryForm: '아파트',
    source: 'index',
    formVariant: 'heroForm',
    sessionDurationMs: 5000,
    consents: {
      privacy: true,
      thirdParty: true,
      marketing: false
    },
    adData: {
      utm_source: 'google',
      device_type: 'mobile'
    }
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.value.phone, '01098765432');
  assert.equal(result.value.adData.utm_source, 'google');
});

test('rejects honeypot spam and invalid phone numbers', () => {
  const result = validateLeadRequest({
    name: '테스트',
    phone: '0212345678',
    inquiryForm: '아파트',
    website: 'spam',
    consents: {
      privacy: true,
      thirdParty: true
    }
  });

  assert.equal(result.errors.includes('Valid phone number is required.'), true);
  assert.equal(result.errors.includes('Spam submission detected.'), true);
});

test('rejects suspiciously fast submissions and fake lead data', () => {
  const result = validateLeadRequest({
    name: 'test',
    phone: '010-0000-0000',
    inquiryForm: '아파트',
    sessionDurationMs: 300,
    consents: {
      privacy: true,
      thirdParty: true
    }
  });

  assert.equal(result.errors.includes('Valid name is required.'), true);
  assert.equal(result.errors.includes('Fake phone number is not allowed.'), true);
  assert.equal(result.errors.includes('Submission completed too quickly.'), true);
});

test('builds a lead payload with legacy database fields intact', () => {
  const payload = buildLeadPayload({
    name: '홍길동',
    phone: '01012345678',
    source: 'index',
    inquiryForm: '주택',
    formVariant: 'hero_form',
    isDuplicate: false,
    attribution: {
      adPlatform: 'GOOGLE_ADS',
      campaignChannel: 'SA',
      campaignName: 'sa_event',
      trafficLabel: 'GOOGLE_ADS | SA'
    },
    adData: {
      gclid: 'abc',
      gbraid: null,
      wbraid: null,
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'brand',
      utm_term: null,
      utm_content: null,
      referrer: 'https://google.com',
      landing_url: 'https://example.com',
      device_type: 'mobile'
    }
  });

  assert.equal(payload.phone, '010-1234-5678');
  assert.equal(payload.inquiry_form, '주택');
  assert.equal(payload.form_variant, 'hero_form');
  assert.equal(payload.utm_medium, 'cpc');
  assert.equal(payload.source, 'index | GOOGLE_ADS | SA');
});

test('derives search and pmax attribution labels from ad data', () => {
  const sa = deriveCampaignAttribution({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'sa_event',
    utm_term: '??????'
  });
  const pmax = deriveCampaignAttribution({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'pmax_event'
  });

  assert.equal(sa.campaignChannel, 'SA');
  assert.equal(sa.trafficLabel, 'GOOGLE_ADS | SA');
  assert.equal(pmax.campaignChannel, 'PMAX');
  assert.equal(pmax.trafficLabel, 'GOOGLE_ADS | PMAX');
});
