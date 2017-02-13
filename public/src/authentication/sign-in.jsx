var React = require("react");
var Reflux = require("reflux");
var UserInfoStore = require("../stores/user-info-stores");
var Actions = require("../actions");
var emailValidation = require("../utils/validations").emailValidation;
var Api = require("../utils/api")


module.exports = React.createClass({
    mixins: [Reflux.listenTo(UserInfoStore, 'onEventEmitted')],
    getInitialState: function() {
        return {email:"", password:"", error:""}  
    },
    render: function(){
        return <div>
        <div id="loginbox" style={{marginTop:50}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <h1 style={{paddingBottom:20}}>
                <img src="assets/src/images/github-logo.png" width="300"/>
                <span style={{color:"red", verticalAlign:"top"}}>Brwsr</span></h1>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Sign In</div>
                </div>
                <div style={{paddingTop:30}} className="panel-body">
                    <div style={{display:"none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                    <form id="loginform" className="form-horizontal" role="form">
                        <div style={{marginBottom:5}} className="input-group"> <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <input
                                type="text" 
                                className="form-control" 
                                name="email" 
                                placeholder="email" 
                                value={this.state.email} 
                                onChange={this.emailChanged}
                                /> 
                        </div>
                        <div style={{marginBottom:15}} className="input-group"> <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                            <input 
                                id="login-password" type="password" className="form-control" name="password" placeholder="password"
                                value={this.state.password} onChange={this.passwordChanged}/> 
                        </div>
                        
                        <div className="text-center" style={{color:"red"}}>{this.state.error}</div>       
                        
                        <div style={{marginTop:10}} className="form-group">
                            <div className="col-sm-12 controls">
                                <buttton className="btn btn-success btn-block" onClick={this.onLogin}>Login</buttton>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 control">
                                <div style={{borderTop:"1 solid #888", paddingTop:15, fontSize:"85%"}}> Don't have an account? 
                                    <a onClick={this.onSignUp} style={{cursor:"pointer"}}> Sign Up</a> 
                                </div>
                                <div style={{fontSize:"85%", cursor:"not-allowed", color:"gray"}}>Forgot your password? 
                                    <span disabled={true} style={{cursor:"not-allowed"}}>  Reset</span> 
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    },
    emailChanged: function(event) {
        this.setState({email: event.target.value});
    },
    passwordChanged: function(event) {
        this.setState({password: event.target.value});
    },
    onLogin: function() {
        if(!emailValidation(this.state.email)) {
            this.setState({error:"Invalid email!"})
            return;
        }
        else if(this.state.password.length===0) {
            this.setState({error:"Enter password!"})
            return;
        }
        this.setState({error:""})
        Actions.authenticateUser({email:this.state.email, password:this.state.password});
    },
    onEventEmitted: function(event, userprofile) {
        console.log("Event", event)
        if(event==="authentication-fail") { this.setState({error:"Incorrect username or password"}); }
        if(event==="authentication-success") { this.props.onAuthentication(userprofile); }
    },
    onSignUp: function() {
        this.props.onSignUp();
    }
});