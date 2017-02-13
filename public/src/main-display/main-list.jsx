var React = require("react");
var Reflux = require("reflux");
var SavedRepoStore = require("../stores/saved-repo-stores");
var Actions = require("../actions");
var ListItem = require("./list-item");
var sliders = require('../styles/slider-styles');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(SavedRepoStore, 'onEventsEmitted')],
    getInitialState: function() {
        return {
            savedRepoList:[],
            searchEntry:"nodejs/node"
        }
    },
    componentWillMount: function() {
        Actions.getSavedRepos(this.props.userprofile.id);
    },
    componentDidMount: function() {
        sliders.activate();
        $("#fail-alert").hide();
    },
    render: function() {
        return <div id="main-repo-list">
            <div className="content-container clearfix">
               <div className="col-md-12">
                   <h1 className="content-title text-center">Saved</h1>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon3">https://www.github.com/</span>
                        <input id="basic-url" type="text" className="form-control" aria-describedby="basic-addon3" 
                               value={this.state.searchEntry} 
                               onChange={this.searchEntryChanged}/>
                        <span className="input-group-btn">
                            <button 
                                className="btn btn-default" 
                                disabled={!this.state.searchEntry}
                                type="button"
                                onClick={this.addRepo}>Add
                            </button>
                        </span>
                    </div>                   
                   <ul className="main-list list-group">
                       {this.generateListElements()}
                   </ul>
               </div>  
            </div>
            <div className="alert alert-danger" id="fail-alert">
                <button type="button" className="close" data-dismiss="alert">x</button>
                <strong>Failed!</strong> Repository not found.
            </div>
        </div>
    },
    searchEntryChanged(event) {
        this.setState({searchEntry: event.target.value});
    },
    addRepo: function() {
        console.log("Adding Repo", this.state.searchEntry, this.props.userprofile.id);
        Actions.saveRepo(this.state.searchEntry, this.props.userprofile.id);
    },
    generateListElements: function() {
        var elms = this.state.savedRepoList.map(function(repo, index){
            return <ListItem {...repo} key={index} onListItemDeleted={this.onListItemDeleted}></ListItem>
        }.bind(this));
        sliders.activate();
        return elms;
    },
    onListItemDeleted: function(itemid) {
        console.log("Item Deleted", itemid, this.props.userprofile.id);
        Actions.deleteRepo(itemid, this.props.userprofile.id);
    },
    onEventsEmitted: function(event, new_repos) {
        console.log("Event", event, new_repos);
        if(event==="saved-repos-failed") { 
            console.log("Failed to save repo.");
            this.displayFailBanner()
        }
        if(event==='saved-repos-received') {
            this.setState({savedRepoList:new_repos});
        }
    },
    displayFailBanner: function() {
        $("#fail-alert").alert();
        $("#fail-alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#fail-alert").slideUp(500);
        });
    }
});