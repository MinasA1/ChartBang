const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/node-api');
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Database = require('./database');
