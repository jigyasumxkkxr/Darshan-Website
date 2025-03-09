import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true, 
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    role:{
        type:String, 
        enum: ['admin', 'user'], 
        default: 'user'
    },
    mobile:{
        type:String, 
        required:true
    },
    location:{
        type:String
    },
    otp:{
        type:String,
    },
    otp_expiry:{
        type:Date,
    },
    is_verified: {
        type:Boolean, 
        default:false
    },

}, {timestamps:true});

export const User = mongoose.model('User', userSchema);
