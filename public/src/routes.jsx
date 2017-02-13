var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.browserHistory;

var Main = require('./main/main');
var Details = require('./second-screen/second-screen');

module.exports = (
    <Router history={History}>
        <Route path="/" component={Main}>
            <Route path="repo/:repouser/:reponame" component={Details}></Route>
        </Route>
    </Router>
);