var Api = require('../utils/api.jsx');
var Reflux = require('reflux');
var Actions = require('../actions.jsx');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getRecentCommits: function(fullRepoName) {
        console.log("Getting recent commits:", fullRepoName);
        return Api.get("https://api.github.com/repos/"+fullRepoName+"/commits")
            .then(function(json){
                this.commits = json;
                console.log("Recent commits", json);
                this.triggerChange();
            }.bind(this));
    },
    triggerChange: function() {
        this.trigger('change', this.commits);
    }
});