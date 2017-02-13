var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function(){
        return <div>
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                {/*Brand and toggle get grouped for better mobile display*/}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> 
                        <span className="sr-only">Toggle navigation</span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                        <span className="icon-bar"></span> 
                    </button> 
                    <Link to="/" className="navbar-brand">Github Browser</Link>
                </div>
                {/*Collect the nav links, forms, and other content for toggling*/}
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    { this.props.authenticated ?
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown"> 
                                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            {this.props.userprofile.email}
                                            <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="disabled"><Link to="/">Account</Link></li>
                                            <li role="separator" className="divider"></li>
                                            <li><Link to="/" onClick={this.signOut}>Sign Out</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                        :
                        ""
                    }
                </div>
            </div>
        </nav>
        </div> 
    },
    signOut: function() {
        this.props.onUnAuthentication()
    }
});