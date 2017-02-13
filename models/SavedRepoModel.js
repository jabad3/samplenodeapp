var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SavedRepoSchema = new Schema({
    user: String,
    saved: Array,
});
var SavedRepo = mongoose.model("Saved-Repos", SavedRepoSchema);

module.exports = SavedRepo;