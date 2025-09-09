const http = require('http');
const fs = require('fs');
const path = require('path');

const URL = 'http://127.0.0.1:5000/api/programs';
const outJson = path.join(__dirname, '..', 'programs_pretty.json');
const outQr = path.join(__dirname, '..', 'qr.png');

console.log('Fetching', URL);

http.get(URL, (res) => {
  const { statusCode } = res;
  if (statusCode !== 200) {
    console.error('Request Failed. Status Code:', statusCode);
    res.resume();
    process.exit(1);
  }

  let raw = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => raw += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(raw);
      fs.writeFileSync(outJson, JSON.stringify(data, null, 2), 'utf8');
      console.log('Saved', outJson);

      if (Array.isArray(data) && data.length > 0 && data[0].qrCodeDataUrl) {
        const qrData = data[0].qrCodeDataUrl.replace(/^data:image\/.+;base64,/, '');
        const buf = Buffer.from(qrData, 'base64');
        fs.writeFileSync(outQr, buf);
        console.log('Saved', outQr);
      } else {
        console.log('No qrCodeDataUrl found on first program');
      }
    } catch (e) {
      console.error('Failed to parse response:', e.message);
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error('Request error:', e.message);
  process.exit(1);
});
