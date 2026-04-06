const fs = require('fs');
const path = require('path');

function loadEnv() {
    const env = {};
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return env;
    fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            env[match[1].trim()] = match[2].trim();
        }
    });
    return env;
}

async function run() {
    const env = loadEnv();
    const tokenParams = new URLSearchParams({
        client_id: env.GOOGLE_ADS_CLIENT_ID,
        client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
        refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
        grant_type: 'refresh_token'
    });
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenParams.toString()
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    
    if (!accessToken) {
        console.error('Failed to get access token:', tokenData);
        process.exit(1);
    }

    const cid = env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, '').trim();
    const devToken = env.GOOGLE_ADS_DEVELOPER_TOKEN.trim();
    const loginCid = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ? env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, '').trim() : null;

    const query = { query: 'SELECT campaign.id, campaign.name, campaign.status FROM campaign WHERE campaign.status = "ENABLED"' };
    
    // Try searchStream and search for multiple versions
    const versions = ['v17', 'v18'];
    const methods = ['search', 'searchStream'];

    for (const v of versions) {
        for (const m of methods) {
            const url = `https://googleads.googleapis.com/${v}/customers/${cid}/googleAds:${m}`;
            console.log(`\n--- Testing ${url} ---`);
            
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'developer-token': devToken,
                'Content-Type': 'application/json'
            };
            if (loginCid) headers['login-customer-id'] = loginCid;

            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(query)
                });

                console.log(`Status: ${res.status}`);
                if (res.ok) {
                    const data = await res.json();
                    const results = Array.isArray(data) ? data.flatMap(c => c.results || []) : (data.results || []);
                    console.log(`SUCCESS! Found ${results.length} results.`);
                    if (results.length > 0) {
                        results.forEach(r => console.log(` - ${r.campaign.name} (ID: ${r.campaign.id})`));
                    }
                } else {
                    const err = await res.text();
                    console.log(`Error: ${err.substring(0, 200)}`);
                }
            } catch (e) {
                console.error(`Fetch Error: ${e.message}`);
            }
        }
    }
}

run();
