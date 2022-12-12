const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("../models/userModel");
const registerRouter = require("../routes/register")


const port = process.env.PORT || 3000;


mongoose.connect('mongodb://127.0.0.1/User')

mongoose.connection.once('open', () => {
    console.log('connection established')
}).on('connectionError', (err) => {
    console.log(err);
})

mongoose.set("strictQuery", true);
app.use(express.json())
app.use("/register", registerRouter)

app.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json({
            status: "SUCCESS",
            data: user
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

app.listen(port, () => {
    console.log(`App is connected at ${port}`);
})