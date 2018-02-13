const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chartBang1');
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Database = require('./database');
