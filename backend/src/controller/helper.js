var cloudinary = require('cloudinary').v2;
const { API_Key, API_Secret, CloudName } = require('../utils/secret');
cloudinary.config({
	cloud_name: CloudName,
	api_key: API_Key,
	api_secret: API_Secret,
	secure: true,
});
const path = require('path');
const fs = require('fs');
const uploadImage = async (req, res) => {
	console.log(req.file);
	cloudinary.uploader.upload(req.file.path, async function (error, result) {
		if (error) throw error;
		fs.unlink(req.file.path, (err) => {
			if (err) throw err;
		});
		return res.json({
			error: false,
			message: 'image upload successfully',
			payload: result,
		});
	});
};
const uploadMultipleImage = async (req, res) => {
	console.log(req.files);
	const files_url = [];
	const promise = req.files.map(async (file) => {
		console.log(file);
		const result = await cloudinary.uploader.upload(file.path);
		fs.unlink(file.path, (err) => {
			if (err) throw err;
		});
		console.log(result);
		const { secure_url, original_filename } = result;

		files_url.push({
			imageName: original_filename,
			secure_url,
		});
	});

	return Promise.all(promise).then(() => {
		return res.json({
			error: false,
			message: 'all images uploaded',
			payload: files_url,
		});
	});
	// cloudinary.uploader.upload(req.file.path, async function (error, result) {
	// 	if (error) throw error;
	// 	fs.unlink(req.file.path, (err) => {
	// 		if (err) throw err;
	// 	});
	// 	return res.json({
	// 		error: false,
	// 		message: 'image upload successfully',
	// 		payload: result,
	// 	});
	// });
};

module.exports = {
	uploadImage,
	uploadMultipleImage,
};
