var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    authenticateUser: function(credentials) {
        console.log("Auth the user", credentials);
        return Api.post("/api/auth", credentials)
            .then(function(json) {
                if(json.fetchHasFailed) { this.trigger('authentication-fail', {}); return; }

                console.log("Auth Result", json);
                this.userProfile = json;
                this.trigger('authentication-success', this.userProfile);            
            }.bind(this));
    },
    getUserProfile: function() {
        console.log("Getting Profile", this.userProfile)
        return this.userProfile;
    },
    createUser: function(credentials) {
        console.log("Creating User", credentials);
        return Api.post("/api/users", credentials).then(function(result){
            if(result.fetchHasFailed) { this.trigger('creation-fail-duplicate', {}); return; }
            console.log("Creation Result", result);
            this.userProfile = result;
            this.trigger('creation-success', this.userProfile);
        }.bind(this)); 
    }
});