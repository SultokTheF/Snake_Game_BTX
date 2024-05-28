const Leaderboard = require('../models/Leaderboard');

exports.addResult = async (req, res) => {
  try {
    const { username, wallet, level, score } = req.body;
    if (!username || !wallet || !level || !score) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const newResult = new Leaderboard({ username, wallet, level, score });
    await newResult.save();
    res.status(201).json({ message: 'Result added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add result', details: err.message });
  }
};

exports.getTopUsers = async (req, res) => {
  try {
    const topUsers = await Leaderboard.find({})
      .sort({ score: -1 })
      .limit(10);
    if (!topUsers || topUsers.length === 0) {
      return res.status(404).json({ error: 'No top users found' });
    }
    res.status(200).json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top users', details: err.message });
  }
};
