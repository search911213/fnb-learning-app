
const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
	eventName: { type: String, required: true },
	programFile: { type: String, required: true },
	eventUrl: { type: String, required: true },
	qrCodeDataUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Program', ProgramSchema);
