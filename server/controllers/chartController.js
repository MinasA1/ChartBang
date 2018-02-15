const mongoose = require('mongoose');
const { Database, User, Chart } = require('../models');
const Sequelize = require('sequelize')

exports.addChart = async function (req, res) {
    console.log(req.body)
    let db = await Database.findOne({name: req.body.conn})
    let sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPass, {
        host: db.dbHost,
        dialect: db.dbType,
        schema: db.dbSchema,
        operatorsAliases: false,
        timestamps: false
    })
    let labelsRes = await sequelize.query(`SELECT ${req.body.xField} FROM ${req.body.xTable}`)
    //console.log(Object.keys(labelsRes[1]),'RES')
    let labels = []
    for (let j of labelsRes[1]){
      //  console.log(j)
        labels.push(j[req.body.xField])
    }
    datasets = []
    console.log(labels, 'labels')

    for (let i of req.body.datasets) {
        let dataRes = await sequelize.query(`SELECT ${i.labelsField} FROM ${i.labelsTable}`)
        let data = []
        for (let j of dataRes[1]){
            console.log(j[i.labelsField])
            data.push(j[i.labelsField])
        }
        datasets.push({data: data, label: i.labelsTable, backgroundColor: i.color})
    }
    console.log(datasets['data'])
    let chartData = {
        labels,
        datasets
    }
   /*  let options = {
        httpOnly: true,
        sign: true,
        secure: false,
        path: '/',
        domain: 'localhost'
    };
    res.cookie('access_token', token, options);
     */
    console.log(chartData)
    return res.json(chartData);
}
/* conn: 'NewData',
  chartType: 'Line',
  chartName: 'MyChart',
  xTable: 'temperatures',
  xField: 'state',
  datasets: 
   [ { active: 'test',
       labelsTable: 'temperatures',
       labelsField: 'value',
       color: 'blue' } ]  */   
exports.insertChart = async function (req, res) {
    const user = await User.findById(req.params.userId)
    const newCart = new Database(req.body)
    newDB.user.push(user)
    await newDB.save()
    user.databases.push(newDB._id)
    await user.save()
    console.log(newDB)
    console.log(user)
    res.json(newDB)
}
exports.fetchCharts = async function (req, res) {
    console.log(req.body)
    /* let db = await Database.findById(id)
    let sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPass, {
        host: db.dbHost,
        dialect: db.dbType,
        schema: db.dbSchema,
        operatorsAliases: false,
        timestamps: false
    })
    col = Object.values(req.query).join()
    results = await sequelize.query(`SELECT ${col} FROM ${table} AS amenities`)
     */res.json(results)
}