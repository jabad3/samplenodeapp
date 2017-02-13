var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'getSavedRepos', 'getRecentCommits', 'saveRepo', 'authenticateUser', 'getUserProfile', 'deleteRepo', 'createUser'
]);