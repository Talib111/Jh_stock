const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/Admin');
const { SECRET } = require('./secret');
var opts = {};
var mongoose = require('mongoose');

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use(
	'admin-rule',
	new JwtStrategy(opts, function (jwt_payload, done) {
		console.log(jwt_payload);
		Admin.findOne(
			{ _id: mongoose.Types.ObjectId(jwt_payload._id) },
			function (err, user) {
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			}
		);
	})
);
