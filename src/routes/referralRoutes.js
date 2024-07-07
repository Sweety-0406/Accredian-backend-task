const express = require('express');
const router = express.Router();
const { createReferralHandler, getRefferalUsers } = require('../controllers/referralController');

router.post('/referrals', createReferralHandler);
router.get('/referrals', getRefferalUsers);

module.exports = router;


