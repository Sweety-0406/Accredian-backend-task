const express = require('express');
const router = express.Router();
const { createReferralHandler } = require('../controllers/referralController');

router.post('/referrals', createReferralHandler);

module.exports = router;


