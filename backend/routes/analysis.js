const express = require('express');
const router = express.Router();
const natural = require('natural');
const Sentiment = require('sentiment');

const sentiment = new Sentiment();

// POST /api/analysis
router.post('/', async (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'Transcript required' });

  // Analyze
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(transcript);
  const keywords = natural.NGrams.ngrams(tokens, 1).slice(0, 10).map(ng => ng[0]); // simple keywords

  const sentimentResult = sentiment.analyze(transcript);
  const sentimentLabel = sentimentResult.score > 0 ? 'positive' : sentimentResult.score < 0 ? 'negative' : 'neutral';

  const analysis = {
    transcript,
    sentiment: sentimentLabel,
    keywords
  };

  res.json(analysis);
});

module.exports = router;