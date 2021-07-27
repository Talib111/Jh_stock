const Admin_pass = require('../models/Admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/secret');


//this signup is normal signup and not specifically related to passport

const adminSignUp =  (req, res) => {
	// const { name, email, password } = req.body;
	//just user signup
	const name='user101';
	const email='user101@gmail.com';
	const password = 'jhuser101';
	//=====Exist code================//
	
	//===========/Exist code===============//
	bcrypt.genSalt(saltRounds, function (err, salt) {
		if (err) throw err;
		bcrypt.hash(password, salt, async function (err, hash) {
			if (err) throw err;
			const admin = await new Admin_pass({
				name,
				email,
				password: hash,
			}).save();

			return res.json({
				error: false,
				message: 'admin created',
				payload: admin,
			});
		});
	});
};

const adminSignIn = async (req, res) => {
	const { email, password } = req.body;
	//await will wait until return any promise to execute next code
	const admin = await Admin_pass.findOne({
		email,
	});

	if (!admin)
		return res.json({
			error: true,
			message: 'no admin found',
		});

	bcrypt.compare(password, admin.password, async function (err, result) {
		if (err) throw err;

		if (!result)
			return res.json({
				error: true,
				message: 'password not matched',
			});

		//genrating access token to send to client side to saving in local-storage for futher signup
		var token = await jwt.sign({ _id: admin._id, name: admin.name }, SECRET,{
			expiresIn:"3d"
		});
		return res.json({
			error: false,
			message: 'signin successfully',
			payload: token,
		});
	});
};
module.exports = {
	adminSignIn,
	adminSignUp,
};
