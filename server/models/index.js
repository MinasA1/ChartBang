const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chartbang');
let db  = mongoose.connection;
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Database = require('./database');
module.exports.Chart = require('./chart');
