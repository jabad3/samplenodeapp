var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getSavedRepos: function(userid) {
        console.log("Getting Saved Repos:", userid);
        return Api.get("api/repos/"+userid).then(function(response){
            console.log("Saved Repos", response);
            this.repos = response;
            this.triggerChange();
        }.bind(this));
    },
    saveRepo: function(reponame, userid) {
        console.log("Save a repo from:", "https://api.github.com/repos/"+reponame);
        return Api.get("https://api.github.com/repos/"+reponame)
            .then(
                function(json){
                    console.log("Data returned", json);
                    if(json.fetchHasFailed && json.status) {
                        console.log("Request Failed!");
                        this.trigger('saved-repos-failed');
                    }
                    else {
                        console.log("Github Data", json);
                        if( !json.id || !json.description || !json.full_name || !json.html_url) {
                            console.log("Response didnt enough data");
                            this.trigger('saved-repos-failed'); return;
                        }
                        var keep = {repo_id:json.id.toString(), //need to String
                                    description:json.description, 
                                    full_name:json.full_name, 
                                    more:json.html_url,
                                   };
                        Api.post("/api/repos/"+userid, keep).then(function(res){
                            console.log("Posting New Repo", res);
                        })

                        this.getSavedRepos(userid);
                    }
                }.bind(this)
            );
    },
    deleteRepo: function(itemid, userid) {
        console.log("Deleteing a repo", itemid, userid);
        return Api.delete("/api/repos/"+userid+"/"+itemid).then(function(res){
            console.log("Delete results", res);
            this.getSavedRepos(userid);
        }.bind(this))
    },
    triggerChange: function() {
        this.trigger('saved-repos-received', this.repos);
    }
});