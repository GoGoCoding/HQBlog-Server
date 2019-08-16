const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    __v : { type: Number, select: false },
    name : { 
        type: String,
        maxlength: 100,
        required: true
    }
});

module.exports = model('Category', categorySchema);