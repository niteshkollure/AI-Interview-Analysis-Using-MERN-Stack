const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  transcript: String,
  sentiment: String,
  keywords: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analysis', analysisSchema);