const express = require("express");
const router = express.Router();
const login = require("./login");

router.use("/login", login);
router.use('/users', require('./users'))
router.use('/auth', require('./auth'))

router.use((req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
