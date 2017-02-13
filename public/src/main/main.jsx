var React = require('react');
var Navbar = require('../navbar/navbar');
var MainDisplay = require('../main-display/main-list');
var Authentication = require('../authentication/authentication');

module.exports = React.createClass({
    getInitialState: function() {
        return { authenticated:false, userprofile:null }; 
    },
    render: function() {
        return <div>
            <Navbar authenticated={this.state.authenticated} onUnAuthentication={this.onUnAuthentication} userprofile={this.state.userprofile}></Navbar>
            {this.content()}
        </div>
    },
    content: function() {
        if(this.state.authenticated===false) { return <Authentication onAuthentication={this.onAuthentication}></Authentication>; }
        if(this.props.children) { return this.props.children; }
        else { return <MainDisplay userprofile={this.state.userprofile}></MainDisplay>; }
    },
    onAuthentication: function(userprofile) {
        console.log("Authenticated!", userprofile);
        this.setState({ authenticated:true, userprofile:userprofile });
    },
    onUnAuthentication: function() {
        console.log("Logging Off");
        this.setState({ authenticated:false, userprofile:null })
    }
});