const https = require('https');

const req = https.request({
  hostname: 'integrate.api.nvidia.com',
  path: '/v1/models',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer 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',
  }
}, r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const data = JSON.parse(d);
    console.log('Models available:');
    (data.data || []).forEach(m => console.log(' -', m.id));
  });
});
req.on('error', e => console.log('ERROR:', e.message));
req.end();
