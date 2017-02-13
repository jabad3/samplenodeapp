var React = require('react');
var Reflux = require("reflux");
//var RepoInfoStore = require("../stores/repo-info-stores");
var RepoInfoStore = require("../stores/repo-info-stores.jsx");
//var Actions = require('../actions');
var Actions = require('../actions.jsx');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(RepoInfoStore, 'onChange')],
    getInitialState: function() {
        return {
            selectedCommit: null,
            recentCommits:[]
        }
    },
    componentWillMount: function() {
        console.log("mounting second screen");
        Actions.getRecentCommits(this.props.params.repouser+"/"+this.props.params.reponame);
    },
    render: function() {
        return <div id="second-screen">
            <div className="parent">
                <div className="side">
                    <ul className="side-bar-list">
                        {this.generateListElements()}
                    </ul>
                </div>
                <div className="main">
                    {this.state.selectedCommit==null ? 
                        ("") :
                        (<div className="panel panel-primary">
                            <div className="panel-heading">{this.props.params.repouser+"/"+this.props.params.reponame}</div>
                            <div className="panel-body">
                                <p><label>Id: </label> {this.state.selectedCommit.sha}</p>
                                <p><label>Author: </label> {this.state.selectedCommit.commit.author.name}</p>
                                <p><label>Message: </label> {this.state.selectedCommit.commit.message}</p>
                                <p><label>Url: </label> <a href={this.state.selectedCommit.commit.url} target="_blank">{this.state.selectedCommit.commit.url}</a></p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    },
    generateListElements: function() {
        return this.state.recentCommits.map(function(commit, index){
            var finalChar = commit.sha.slice(-1);
            var isInt = parseInt(finalChar).toString();
            var colorLogic = (isInt==="NaN")?"black":"blue";
            return <li className="list-group-item" style={{color:colorLogic}} onClick={()=>this.commitClicked(commit)} key={index}>{commit.sha}</li>
        }.bind(this));
    },
    commitClicked: function(commit_object) {
        console.log("Selected Commit", commit_object);
        this.setState({selectedCommit:commit_object});
    },
    onChange: function(event, recent_commits) {
        this.setState({recentCommits:recent_commits});
    }
});