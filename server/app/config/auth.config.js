const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('mongoose').model('User');

const configAuth = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    const options = {};
    options.jwtFromRequest = ExtractJwt.fromHeader('token');
    options.secretOrKey = app.get('superSecret');

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload._id)
            .then((user) => {
                if(!user) {
                    return done(null, false);
                }

                /* if(!user.authenticate(password)) {
                    return done(null, false);
                } */

                return done(null, user);
            })
            .catch((err) => {
              done(err, false);
            });
    }));

    passport.serializeUser((user, done) => {
        if(user) {
            return done(null, user._id);
        }

        return done(null, null);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then((user) => {
                if(!user) {
                    return done(null, false);
                }

                return done(null, user);
            })
            .catch((err) => {
               done(err, false);
            })
    });
};

module.exports = configAuth;
