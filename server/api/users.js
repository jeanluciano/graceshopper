const express = require('express')
const User = require('../db/models/users')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log('router/post')
  User.create(req.body)
  .then(user => {
    req.login(user, err => {
      if (err) next(err)
      else res.status(201).json(user)
    })
  })
  .catch(next)
})

router.get('/me', (req, res, next) => {
  res.json(req.user)
})

module.exports = router
