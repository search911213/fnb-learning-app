const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const outJson = path.join(__dirname, '..', 'programs_pretty.json');
const outQr = path.join(__dirname, '..', 'qr.png');

function getNewestFile(dir) {
  const files = fs.readdirSync(dir).map(f => ({
    name: f,
    time: fs.statSync(path.join(dir, f)).mtime.getTime()
  })).sort((a,b) => b.time - a.time);
  return files.length ? files[0].name : null;
}

(async () => {
  try {
    if (!fs.existsSync(uploadsDir)) throw new Error('Uploads directory not found: ' + uploadsDir);
    const newest = getNewestFile(uploadsDir);
    if (!newest) throw new Error('No files found in uploads directory');

    const encoded = encodeURIComponent(newest).replace(/%20/g, '%20');
    const eventUrl = `http://127.0.0.1:5000/uploads/${encoded}`;

    // regenerate QR PNG
    await QRCode.toFile(outQr, eventUrl, { type: 'png' });

    // write a minimal programs JSON
    const program = {
      eventName: path.parse(newest).name,
      programFile: newest,
      eventUrl,
      qrCodeSource: 'regenerated-locally',
      createdAt: new Date().toISOString()
    };
    fs.writeFileSync(outJson, JSON.stringify([program], null, 2), 'utf8');

    console.log('Wrote:', outQr);
    console.log('Wrote:', outJson);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
