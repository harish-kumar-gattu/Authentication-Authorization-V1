const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const postModel = require("../models/postsModel")
const secret = "@7Q2c%9z"

router.use("/", (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                req.user = decoded.data
                next();
            })

        }
    } else {
        res.status(400).json({
            status: "Failed",
            message: "not authenticated please try after login"
        })
    }

})

router.get("/:id", async (req, res) => {
    try {
        const post = await postModel.find({ _id: req.params.id });
        res.json({
            status: "SUCCESS",
            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find().populate();
        res.json({
            status: "SUCCESS",
            data: posts
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post("/", async (req, res) => {
    const { title, body, imageUrl } = req.body
    try {
        const post = await postModel.create({
            title: title,
            body: body,
            imageUrl: imageUrl,
            user: req.user
        });
        res.json({
            status: "SUCCESS",
            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const post = await postModel.updateOne({ _id: req.params.id }, req.body);
        if (post.modifiedCount) {
            res.json({
                status: "SUCCESS",
                data: post
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "data not found !"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await postModel.deleteOne({ _id: req.params.id })
        if (post.deletedCount) {
            res.json({
                status: "SUCCESS",
                data: post
            })
        } else {
            res.status(404).json({
                status: "Failed",
                message: "data not found !"
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