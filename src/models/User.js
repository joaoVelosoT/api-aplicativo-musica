const mongoose = require('mongoose');

const Schema = mongoose.Schema();

const userSchema = new Schema({
    nome : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    senha : {
        type : String,
        required : true
    }, 
}, {timestamps : true});


const User = mongoose.model("User", userSchema);
module.exports = User;