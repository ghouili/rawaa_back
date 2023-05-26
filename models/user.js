const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    firstname:{type: String, rquired: true},
    lastname:{type: String, rquired: true},
    email:{type:String, unique:true},
    phonenumber:{type: Number, rquired: true},
    governorat:{type:String,required:true},
    date:{type:Date,required:true},
    role:{type:String,},
    avatar:{type:String,},
    password:{type: String,},
    id_entreprise:{type: mongoose.Types.ObjectId, ref: "comapny"},
});

module.exports = mongoose.model('user', UserSchema);