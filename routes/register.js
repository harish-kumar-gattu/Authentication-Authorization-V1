const express = require("express");
const router = express.Router();
// const postsModel = require("../models/postsModel")
const userModel = require("../models/userModel")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


router.get("/", (req, res) => {
    res.json({
        status: "Success",
        message: "Ok"
    })
})

router.post("/", body("name").isAlpha(), body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    const errObject = errors.array()[0];
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Failed",
            message: `${errObject.msg} at ${errObject.param}`
        });
    }

    try {
        const { name, email } = req.body
        const user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(400).json({
                Status: "Failed",
                message: "User already exists with the given email please try again"
            })
        } else {
            if (req.body.email && req.body.name && req.body.password) {
                let { email, name, password } = req.body;
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) {
                        return res.json({
                            status: "Failed",
                            Error: err.message
                        })
                    }
                    const user = await userModel.create({ name: name, email: email, password: hash });
                    return res.json({
                        status: "Success",
                        data: user
                    })
                })
            } else {
                return res.status(400).json({
                    status: "Failed",
                    message: "Please complete all fields and submit form"
                })
            }
        }
    } catch (e) {
        return res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;