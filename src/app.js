const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1/User')

mongoose.connection.once('open', () => {
    console.log('connection established')
}).on('connectionError', (err) => {
    console.log(err);
})

app.get("/", async (req, res) => {
    res.json("Landing Page...")
})

app.listen(port, () => {
    console.log(`App is connected at ${port}`);
})