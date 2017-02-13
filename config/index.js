var configValues = require("./config");
module.exports = {
    getDbConnectionString : function() {
        return "mongodb://"+configValues.username+":"+configValues.password+"@ds051943.mlab.com:51943/githubbrowser"
    }
}