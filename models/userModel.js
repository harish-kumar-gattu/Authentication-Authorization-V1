const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userschema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: String
})

const UserModel = mongoose.model("User", userschema);

module.exports = UserModel;