const express = require('express');
const { getKnowledgeBase, diagnose } = require('../controllers/diagnosisController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/knowledge/:category', getKnowledgeBase);
router.post('/submit', protect, diagnose);

module.exports = router;
