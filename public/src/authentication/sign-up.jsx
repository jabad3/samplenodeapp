var React = require("react");
var Reflux = require("reflux");
var UserInfoStore = require("../stores/user-info-stores");
var Actions = require("../actions");

var emailValidation = require("../utils/validations").emailValidation;
var Api = require("../utils/api")

module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserInfoStore, 'onEventEmitted')],
    getInitialState: function() {
        return {email:"", password1:"", password2:"", error:""};  
    },
    render: function(){
        return  <div>       
            <div id="signupbox" style={{marginTop:50}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">Sign Up</div>
                    </div>
                    <div className="panel-body">
                        <form id="signupform" className="form-horizontal" role="form">
                            <div id="signupalert" style={{display:"none"}} className="alert alert-danger">
                                <p>Error:</p> <span></span> </div>
                            <div className="form-group">
                                <label for="email" className="col-md-3 control-label">Email</label>
                                <div className="col-md-9">
                                    <input 
                                        type="text" className="form-control" name="email" placeholder="Email Address" 
                                        value={this.state.email} onChange={this.onEmailChanged} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="password" className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                    <input 
                                        type="password" className="form-control" name="passwd" placeholder="Password" 
                                        value={this.state.password1} onChange={this.onPassword1Changed} /> 
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="col-md-3 control-label"></label>
                                <div className="col-md-9">
                                    <input 
                                        type="password" className="form-control" name="passwd" placeholder="Password"
                                        value={this.state.password2} onChange={this.onPassword2Changed} /> 
                                </div>
                            </div>
                            <div className="text-center" style={{color:"red"}}>{this.state.error}</div>       
                            <div className="form-group">
                                <div className="col-md-offset-3 col-md-9">
                                    <button id="btn-signup" type="button" className="btn btn-info btn-block" onClick={this.onSignUp}>
                                        <i className="icon-hand-right"></i>Sign Up
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-3 col-md-9">
                                    <button id="btn-signup" type="button" className="btn btn-info btn-block" onClick={this.onCancelSignUp}><i className="icon-hand-right"></i>Cancel</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    },
    onEmailChanged: function(event) {
        this.setState({email: event.target.value});
    },
    onPassword1Changed: function(event) {
        this.setState({password1: event.target.value});
    },
    onPassword2Changed: function(event) {
        this.setState({password2: event.target.value});
    },
    onSignUp: function() {
        if(!emailValidation(this.state.email)) {
            this.setState({error:"Invalid email!"}); 
            return;
        }
        else if(this.state.password1.length==0 || this.state.password2.length==0) { 
            this.setState({error:"Enter password!"}); 
            return;
        }
        else if(this.state.password1.length<2 || this.state.password2.length<2) { 
            this.setState({error:"Minimum password length is 2"}); 
            return;
        }
        else if(this.state.password1!=this.state.password2) { 
            this.setState({error:"Passwords do not match!"}); 
            return;
        }
        else {
            this.setState({error:""});
            Actions.createUser({email:this.state.email, password:this.state.password1});
        }
    },
    onCancelSignUp: function() {
        this.props.onCancelSignUp();
    },
    onEventEmitted: function(event, userprofile) {
        console.log("Event", event)
        if(event==="creation-fail-duplicate") { this.setState({error:"Email taken!"}); }
        if(event==="creation-success") { this.props.onAuthentication(userprofile); }
    },
});