const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    adminFlag: {type:Boolean, default:false}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;