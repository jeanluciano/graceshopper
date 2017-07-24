const express = require("express");
const User = require("../db/users");
const router = express.Router();

router.get("/", (req, res, next) => {
    User.findOne({
        where: req.body.email
    })
    .then( user => {
        if (user.Model.correctPassword(req.body.password)){
            //do login stuff
        } else {
            res.send(401);
        }
    })
    .catch(next);
})

module.exports = router;
