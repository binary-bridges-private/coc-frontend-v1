const https = require('https');

const data = JSON.stringify({
  email: 'test@test.com',
  password: 'test'
});

console.log('--- TESTING SECURE POST REQUEST ON cfmpracticeapi ---');
const postReq = https.request('https://cfmpracticeapi.coceducation.com/practice/v1/auth/login', {
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Body length:', body.length);
    testOptions();
  });
});

postReq.on('error', (e) => {
  console.error('POST Error:', e);
  testOptions();
});

postReq.write(data);
postReq.end();

function testOptions() {
  console.log('\n--- TESTING SECURE OPTIONS REQUEST ON cfmpracticeapi ---');
  const optionsReq = https.request('https://cfmpracticeapi.coceducation.com/practice/v1/auth/login', {
    method: 'OPTIONS',
    rejectUnauthorized: false,
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type'
    }
  }, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => console.log('Body length:', body.length));
  });

  optionsReq.on('error', (e) => {
    console.error('OPTIONS Error:', e);
  });

  optionsReq.end();
}
