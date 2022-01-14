const mongoose = require("mongoose"),

    FileSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    encodedName: { type: String, required: false, max: 100, default: null }
    });


    


    module.exports = mongoose.model('file', FileSchema, 'files')