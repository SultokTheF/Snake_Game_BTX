const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.post('/', leaderboardController.addResult);
router.get('/', leaderboardController.getTopUsers);

module.exports = router;
