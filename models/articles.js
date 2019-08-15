const mogoose = require('mongoose');
const { Schema, model } = mogoose;

const articlesSchema = new Schema({
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
    tags: {
        type: [ { type : Schema.Types.ObjectId , ref: 'tag'}],
    }

}, { timestamps: true });

module.exports = model('Articles', articlesSchema);