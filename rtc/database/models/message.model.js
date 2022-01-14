const mongoose = require("mongoose"),

    ChatSchema = new mongoose.Schema({
        username: String,
        msg: String
    });
    

    module.exports = mongoose.model('chat', ChatSchema)