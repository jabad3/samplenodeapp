var express = require("express");
var mongoose = require("mongoose");
var config = require("./config");
var apiController = require("./controllers/apiController");

var app = express();
var port = process.env.PORT || 8001;

mongoose.connect(config.getDbConnectionString());
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("mongoose connected"); });

app.use("/assets", express.static(__dirname + "/public"));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
apiController(app);

app.listen(port);