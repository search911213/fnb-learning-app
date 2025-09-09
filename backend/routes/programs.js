// routes/programs.js
// Handles event program uploads and fetches

const express = require('express');
const router = express.Router();


const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

// Multer setup (store PDFs in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


const Program = require('../models/Program');


// Upload PDF program
router.post('/upload', upload.single('programFile'), async (req, res) => {
  try {
    const { eventName } = req.body;
    if (!req.file) return res.status(400).send('No file uploaded');

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const encodedFilename = encodeURIComponent(req.file.filename);
    const fileUrl = `${baseUrl}/uploads/${encodedFilename}`;
    const eventUrl = fileUrl;
    const qrCodeDataUrl = await QRCode.toDataURL(eventUrl);

    const programData = {
      eventName,
      programFile: req.file.filename,
      eventUrl,
      qrCodeDataUrl,
      createdAt: new Date()
    };

    const program = new Program(programData);
    await program.save();
    return res.json(program);

  } catch (err) {
    res.status(500).json({ error: 'Failed to upload program', details: err.message });
  }
});


// Fetch all uploaded programs from MongoDB
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    // If DB fails, try local fallback
    const localPath = path.join(__dirname, '..', 'data', 'programs_local.json');
    if (fs.existsSync(localPath)) {
      const raw = fs.readFileSync(localPath, 'utf8') || '[]';
      return res.json(JSON.parse(raw));
    }
    res.status(500).json({ error: 'Failed to fetch programs', details: err.message });
  }
});

// Create a new program (simple JSON create)
router.post('/', async (req, res) => {
  try {
    const program = new Program(req.body);
    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (moved) placeholder for GET by ID - implemented at bottom

// ✅ Update program by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Program not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete program by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Program not found' });
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Fetch a single program by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json(program);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch program', details: err.message });
  }
});

module.exports = router;
