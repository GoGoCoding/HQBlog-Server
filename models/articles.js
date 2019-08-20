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

    author:{ 
        type : Schema.Types.ObjectId , 
        ref: 'User' 
    },

    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    tags: [{
        type:Schema.Types.ObjectId,
        ref:'Tag'
    }]


}, { timestamps: true });

module.exports = model('Article', articleSchema);