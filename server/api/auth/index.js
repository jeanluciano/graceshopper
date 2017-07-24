const router = require('express').Router()
const passport = require('passport')
const User = require('../../db/models/users')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
  },
  function(token, refreshToken, profile, done){
    const info = {
      name: profile.displayName,
      email: profile.emails[0].value,
    }
    User.findOrCreate({
      where: {
        googleId: profile.id,
      },
      defaults: info,
    })
    .spread(function (user){
      done(null, user)
    })
    .catch(done)
  })
)

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

router.get('/google', passport.authenticate('google', { scope: 'email'}))

router.get('/google/callback', passport.authenticate('google', {
  successRedirect:'/',
  failureRedirect: '/login',
}))

module.exports = router
