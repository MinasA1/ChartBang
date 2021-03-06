const mongoose = require('mongoose');
const SeqAuto = require('sequelize-auto');
const {Database, User} = require('../models');
const Sequelize = require('sequelize')

async function saveDb(dbInfo, user) {

    db = await Database.find({name: dbInfo.name})
    console.log(db)
    if (!db.lenght) {
        let newDB = new Database(dbInfo)
        await newDB.addUser(user)
        await newDB.save()
        await user.addDb(newDB)
        console.log(newDB, user)
    } else {
        console.log('DB exists')
    }
}

exports.findSchema = async function (req, res) {
    console.log(req.body, 'BODY')
    let db = await Database.findOne({name: req.body.name})
    console.log(db)
    auto = getSchema(db)
    auto.run(async function (err) {
        if (err) {
            return res.status(400).send({
                message: err.errmsg
            });
        }
        return res.json(schemaToJSON(auto.tables))  
    })
}

exports.schema = async function (req, res) {
    console.log(req.body)
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
        return res.json(schemaToJSON(auto.tables))  
    })
}

function getSchema(db) {
    console.log(db,'from db')
    let auto = new SeqAuto(db.dbName, db.dbUser, db.dbPass, {
        host: db.dbHost,
        dialect: db.dbType,
        schema: db.dbSchema,
        directory: false
    })
    return auto
}

function schemaToJSON(tables) {
    console.log(tables, 'schemaTOJSON')
    let schema = {};
    Object.keys(tables).forEach((key) => {
        schema[key] = Object.keys(tables[key]);
    });
    console.log(schema)
    return schema
}

exports.fetchData = async function (req, res) {
    let { id, table } = req.params
    let db = await Database.findById(id)
    let sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPass, {
        host: db.dbHost,
        dialect: db.dbType,
        schema: db.dbSchema,
        operatorsAliases: false,
        timestamps: false
    })
    col = Object.values(req.query).join()
    results = await sequelize.query(`SELECT ${col} FROM ${table} AS amenities`)
    res.json(results)
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