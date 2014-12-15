'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	gameId: String,
	events: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Events', EventSchema);