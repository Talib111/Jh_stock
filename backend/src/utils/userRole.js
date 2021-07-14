const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const All_User = require('../models/All_user');
const { SECRET } = require('./secret');
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use(
	'user-rule',
	new JwtStrategy(opts, function (jwt_payload, done) {
		All_User.findOne({ _id: jwt_payload._id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
				// or you could create a new account
			}
		});
	})
);
