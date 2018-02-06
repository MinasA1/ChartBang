const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let DatabaseSchema =  new  Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    dbType: {
        type: String,
        required: true
    },
    dbHost: {
        type: String,
        required: true
    },
    dbName: {
        type: String,
        required: true
    },
    dbUser: {
        type: String,
        required: true
    },
    dbPass: {
        type: String,
        required: true
    },
    dbSchema: {
        type: String
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Database = mongoose.model('Database', DatabaseSchema);
module.exports = Database;