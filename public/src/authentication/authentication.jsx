var React = require("react");
var SignIn = require("./sign-in");
var SignUp = require("./sign-up");

module.exports = React.createClass({
    getInitialState: function() {
        return {signin:true, signup:false};
    },
    render: function(){
        return <div>  
            {this.state.signin?(<SignIn onSignUp={this.onSignUp} onAuthentication={this.onAuthentication}></SignIn>):(this.state.signup?(<SignUp onCancelSignUp={this.onCancelSignUp} onAuthentication={this.onAuthentication}></SignUp>):"")}
        </div>
    },
    onSignUp: function() {
        this.setState({signin:false,signup:true});    
    },
    onCancelSignUp: function() {
        this.setState({signup:false,signin:true});
    },
    onAuthentication: function(userprofile) {
        this.props.onAuthentication(userprofile);
    }
});