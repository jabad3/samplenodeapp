var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    //password: String,
    hash: String,
    salt: String
});
var Users = mongoose.model("Users", UserSchema);

module.exports = Users;