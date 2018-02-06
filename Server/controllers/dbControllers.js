const mongoose = require('mongoose');
const SeqAuto = require('sequelize-auto');
const {Database, User} = require('../models');

function schemaGen(tables) {
    let schema = {};
    Object.keys(tables).forEach((key) => {
      schema[key] = Object.keys(tables[key]);
    });
    return schema;
  }
  

exports.readSchema = async function (req, res) {
    console.log(req.body, 'HERE');

    let auto = new SeqAuto(req.body.dbName, req.body.dbUser, req.body.dbPass, {
        host: req.body.dbHost,
        dialect: req.body.dbType,
        schema: req.body.dbSchema,
        directory: false
    });
    auto.run(function (err) {
            if (err) { 
                return res.status(400).send({
                    message: err.errmsg
                });
            }
            schema = schemaGen(auto.tables);
            console.log('SCHMEA IS ', schema);
            return res.json(schema);        
        });
    }
    
//let newDB = new Database(req.body);  
// User.findOne({
//    email: req.cookies['user']
//}, function (err, user) {
//    if (err) {
//        return res.status(400).send({
//            message: err.errmsg
 //       });
  //  }
 //   newDB.user = user;
//});
//newDB.save(function (err, db) {
//    if (err) {
 //       console.log(err);
//    }
//});