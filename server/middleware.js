const express = require('express')
const morgan = require('morgan')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')

//Logging Middleware
router.use(morgan("default"))
//Static Middleware
router.use(express.static(path.join(__dirname, '..', 'public')))
//Parsing Middleware
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

module.exports = router;