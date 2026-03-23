#!/usr/bin/env node

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID'
];

function getMissingEnv() {
  return REQUIRED_ENV.filter((name) => !process.env[name]);
}

async function fetchAccessToken() {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    throw new Error(`OAuth token refresh failed: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function queryGoogleAds(accessToken, query) {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '');
  const url = `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/googleAds:searchStream`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
    'Content-Type': 'application/json'
  };

  if (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID) {
    headers['login-customer-id'] = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, '');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`Google Ads query failed: ${await response.text()}`);
  }

  return response.json();
}

function flattenStreamRows(streamChunks) {
  return (streamChunks || []).flatMap((chunk) => chunk.results || []);
}

async function main() {
  const missing = getMissingEnv();
  if (missing.length > 0) {
    console.error(`Missing env vars: ${missing.join(', ')}`);
    process.exit(1);
  }

  const accessToken = await fetchAccessToken();

  const mode = process.env.GOOGLE_ADS_MODE || 'campaigns';

  const customQuery = process.env.GOOGLE_ADS_QUERY;

  const query = customQuery || (mode === 'clients'
    ? `
      SELECT
        customer_client.client_customer,
        customer_client.descriptive_name,
        customer_client.currency_code,
        customer_client.time_zone,
        customer_client.manager,
        customer_client.level,
        customer_client.status
      FROM customer_client
      WHERE customer_client.level <= 1
      ORDER BY customer_client.manager, customer_client.descriptive_name
    `
    : `
      SELECT
        campaign.id,
        campaign.name,
        campaign.advertising_channel_type,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value,
        metrics.average_cpc,
        segments.date
      FROM campaign
      WHERE segments.date DURING LAST_7_DAYS
      ORDER BY segments.date DESC, campaign.id
    `);

  const stream = await queryGoogleAds(accessToken, query);
  const rows = flattenStreamRows(stream);
  console.log(JSON.stringify(rows, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
const GOOGLE_ADS_API_VERSION = 'v22';
