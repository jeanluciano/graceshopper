const express = require("express");
const User = require("../db/models/users");
const router = express.Router();

router.get("/", (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
    .then( user => {
        if (user && user.Model.correctPassword(req.body.password)){
            //do login stuff
            req.login(user, err => {
                if(err) next(err)
                else res.json(user)
            })
        } else {
            res.status(401).send('Username or Password is incorrect.')
        }
    })
    .catch(next);
})

router.post('/' , (req,res,next) => {
    req.logout()
    res.sendStatus(200)
})

module.exports = router;
