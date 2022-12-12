const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const User = require("./userModel")
const Schema = mongoose.Schema;


const postsSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: { type: ObjectID, ref: User }
})

const postModel = mongoose.model("Post", postsSchema);

module.exports = postModel;