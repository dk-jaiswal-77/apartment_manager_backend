const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    flat_type : {type : String, required : true}, // owner /tenant
    block : {type : String, required : true}, // A, B, C...
    flat_no : {type : String, required : true}, // 101, 103...
    residents_count : {type : Number, required : true}
}, {versionKey : false, timestamps : true});

module.exports = mongoose.model("flat", flatSchema);