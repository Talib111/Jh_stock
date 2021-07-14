const express = require('express');
const { adminSignUp, adminSignIn } = require('../controller/admin');
const router = express.Router();

router.post('/signup', adminSignUp);
router.post('/signin', adminSignIn);

module.exports = router;
