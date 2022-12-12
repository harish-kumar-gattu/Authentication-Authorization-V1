const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userschema = new Schema({
    name: { type: String, require: true },
    email: { type: String, unique: true },
    password: String
})

const User = mongoose.model("User", userschema);

module.exports = User;