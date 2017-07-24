const express = require('express')
const morgan = require('morgan')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require("passport");


//Logging Middleware
router.use(morgan("default"))
//Static Middleware
router.use(express.static(path.join(__dirname, '..', 'public')))
//Parsing Middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
//session middleware
router.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));



router.use(passport.initialize());
router.use(passport.session());

module.exports = router;
