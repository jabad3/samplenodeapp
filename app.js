var express = require("express");
var mongoose = require("mongoose");
var config = require("./config");
var apiController = require("./controllers/apiController");

var app = express();
var port = process.env.PORT || 8001;

mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString());

/* Mongoose Connection Settings */
//var db = mongoose.connection;
//db.once('open', function() { console.log("mongoose connected"); });
//db.on('error', console.error.bind(console, 'connection error:'));

app.use("/assets", express.static(__dirname + "/public"));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
apiController(app);

app.listen(port);