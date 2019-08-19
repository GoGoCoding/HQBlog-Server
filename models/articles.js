const mogoose = require('mongoose');
const { Schema, model } = mogoose;

const articleSchema = new Schema({
    __v : { type: Number, select:false },
    title : { 
        type: String,
        maxlength: 255,
        required: true
    },
    content: {
        type: String,
    },
    showOrder: {
        type: Number,
    },
    author:
        { type : Schema.Types.ObjectId , ref: 'User' }

}, { timestamps: true });

module.exports = model('Article', articleSchema);