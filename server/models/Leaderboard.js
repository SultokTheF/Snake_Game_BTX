const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  username: String,
  wallet: String,
  level: String,
  score: Number
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
