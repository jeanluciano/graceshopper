const path = require("path");
const express = require("express");
const app = express();
const middleware = require('./middleware');
const db = require("./db");
const passport = require('passport')

//Remove on producition
process.env.NODE_ENV = 'development'

if(process.env.NODE_ENV === 'development') {
  require('./utils/localSecrets.js')
}

app.use(middleware);

app.use('/api', require('./api'))
app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', "public/index.html"));
});

app.get('/auth/google', passport.authenticate('google', { scope: 'email'}))


//TODO: Make the redirects to something reasonable
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3000, (err) => {
  if (err) throw err;
  db.sync().then(() => console.log('Database is synced'));
  console.log('shits working.')
})

module.exports = app