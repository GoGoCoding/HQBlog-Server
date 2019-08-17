const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: { type: Number, select: false },
    username: { 
        type: String, 
        maxlength: 50,
        require: true,
        unique: true 
    },
    //通过 bcrypt 加密后的密码
    password: { 
        type: String, 
        require: true,
        select: false
    },
    email: {
        type: String,
        maxlength:50,
        require:true,
        unique: true

    },
    //用户权限：1 - admin, 2 - 普通用户
    auth: {
        type:String,
        enum : ['admin','user'],
        default:'user'
    }
}, { timestamps: true });


module.exports = model('User', userSchema);