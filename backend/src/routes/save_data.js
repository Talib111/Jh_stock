const express = require('express');
const { save_pro_data,update_pro_data,get_pro_data, update_add_pro_data, reset_pro_data } = require('../controller/save_data');
const router = express.Router();

router.post('/save', save_pro_data);
router.post('/update', update_pro_data);
router.post('/updateadd', update_add_pro_data);
router.post('/reset', reset_pro_data);
router.post('/get', get_pro_data);

// router.post('/signin', adminSignIn);

module.exports = router;
