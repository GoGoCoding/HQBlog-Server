const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tagSchema = new Schema({
    __v : { type: Number, select: false},
    name: {
        type:String,
        maxlength:100,
        require: true
    }

}, {timestamps:true});

module.exports = model('Tag', tagSchema);