const mongoose = require('mongoose');
const SeqAuto = require('sequelize-auto');
const {Database, User} = require('../models');
const Sequelize = require('sequelize')


async function saveDb(dbInfo, user) {
    try {
        let newDB = new Database(dbInfo)
        await newDB.addUser(user)
        newDB.save(function(err, db) {
            if (err) throw err
            user.addDb(db)
        })
    
    }
    catch(err) {
        console.log(err)
    }
}



exports.schema = async function (req, res) {
    auto = getSchema(req.body)
    auto.run(async function (err) {
            if (err) { 
                return res.status(400).send({
                    message: err.errmsg
                });
            }
           const user = await User.findOne({
                email: req.cookies['user']
              })
            saveDb(req.body, user)
            })
            schema = schemaToJSON(auto.tables);
            return res.json(schema);        
    }
function getSchema(db) {
    let auto = new SeqAuto(db.dbName, db.dbUser, db.dbPass, {
        host: db.dbHost,
        dialect: db.dbType,
        schema: db.dbSchema,
        directory: false,
        timestamps: false
    })
    
    return auto
}

function schemaToJSON(tables) {
    let schema = {};
    Object.keys(tables).forEach((key) => {
      schema[key] = Object.keys(tables[key]);
    });
    return schema
}

exports.fetchData = async function (req, res) {
        let {id, table} = req.params
        let db = await Database.findById(id)
        auto = getSchema(db)
        auto.run(async function (err) {
            if (err) throw err
            a = await auto.tables
            console.log(`${db.dbType}://${db.dbUser}:${db.dbPass}@${db.dbHost}:/${db.dbName}`)
            let sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPass, {
                host: db.dbHost,
                dialect: db.dbType,
                schema: db.dbSchema,
                operatorsAliases: false,
                timestamps: false
            })
            //a[table]['created_at'] = undefined
            //a[table]['updated_at'] = undefined
            tb = sequelize.define(table, {})
            console.log(typeof(tb), typeof(a[table]))
            //tb.findAll(SELECT `id` FROM `amenities` AS `amenities`).then(function(users) {
              //  console.log(users)
             // })
             console.log(Object.keys(req.query))
            am = await sequelize.query(`SELECT * FROM ${table} AS amenities`)
            res.json(am)
        }) 
}

exports.insertDb = async function (req, res) {
    const user = await User.findById(req.params.userId)
    const newDB = new Database(req.body)
    newDB.user.push(user)
    await newDB.save()
    user.databases.push(newDB._id)
    await user.save()
    console.log(newDB)
    console.log(user)
    res.json(newDB)
}
exports.all = async function (req, res) {
    const dbs = await Database.find()
    res.json(dbs)
}