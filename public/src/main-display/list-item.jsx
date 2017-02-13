var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function() {
        return <div>
            <li className="list-group-item">
               <Link to={"/repo/"+this.props.full_name} >
                   <span className="main-header">{this.props.full_name}</span>
                   <span className="main-subheader">{this.props.description}</span>
                   <span className="main-message-preview height-control">
                       {this.props.more}
                   </span>
               </Link>
                <ul className="list-group-submenu">
                    <li className="list-group-submenu-item danger" onClick={this.onListItemDeleted} style={{backgroundColor:"white"}}>
                        <span className="glyphicon glyphicon-remove" style={{color:"red", cursor:"pointer"}}></span>
                    </li>
                </ul>
            </li>
        </div>
    },
    onListItemDeleted: function() {
        this.props.onListItemDeleted(this.props.repo_id);
    }
})