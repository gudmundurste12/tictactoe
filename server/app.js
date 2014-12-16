/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
var mongoose = require('mongoose');

//Connect to Mongo

mongoose.connection.on('connected', function(){
	console.log('Connection successful');
});

mongoose.connection.on('disconnected', function(){
	console.log('Connection failed');
});

//mongoose.connect('mongodb://dbuser1:dbpassword1@ds063870.mongolab.com:63870/gudmundurste12_tictactoe_db', {keepAlive: 1}, function(err){
mongoose.connect('mongodb://localhost/tictactoe_db', {keepAlive: 1}, function(err){
	console.log('connected to mongo');
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.eventStore = require('./eventStore/memoryStore')();

// Expose app
exports = module.exports = app;