const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const secret = '@7Q2c%9z'

router.post("/", body("email").isEmail(), async (req, res) => {
    const errors = validationResult(req);
    const errObject = errors.array()[0];
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Failed",
            message: `${errObject.msg} at ${errObject.param}`
        })
    }

    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(400).json({
                        status: "Failed",
                        Error: err.message
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, secret);
                    return res.json({
                        status: 'SUCCESS',
                        data: user,
                        token: token
                    })
                } else {
                    res.status(404).json({
                        status: "Failed",
                        message: "Session Expired or authentication error."
                    })
                }
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;