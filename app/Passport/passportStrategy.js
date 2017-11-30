const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models/database');
const config = require('./../config');

function hookJWTStrategy(passport) {
  const options = {};
  options.secretOrKey = config.keys.secret;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  // options.jwtFromRequest = ExtractJwt.fromAuthHeader();
  options.ignoreExpiration = false;
  passport.use(new Strategy(options, ((JWTPayload, callback, raw = true) => {
    db.user.findOne({
      attributes: ['id', 'user_name', 'role'],
      where: { email_id: JWTPayload.EmailId },
      raw: true
    })
      .then((user) => {
        if (!user) {
          callback(null, false);
          return;
        }
        callback(null, user);
      });
  })));
}


module.exports = hookJWTStrategy;
