const express = require('express');
const { uploadImage, uploadMultipleImage } = require('../controller/helper');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// @ Route /helper/uploadimage
router.post('/uploadimage', upload.single('image'), uploadImage);
// @ Route /helper/uploadimage/multiple
router.post(
	'/uploadimage/multiple',
	upload.array('images'),
	uploadMultipleImage
);

module.exports = router;
