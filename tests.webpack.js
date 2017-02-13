// tests.webpack.js

//var path = require('path');
//resolve: { extensions: ['', '.js', '.jsx'] }

var context = require.context('./public/src', true, /-test\.jsx?$/);
context.keys().forEach(context);