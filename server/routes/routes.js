const express = require('express');
let router = express.Router();
let { Database } = require('../models');
let { userHandlers, dbHandlers, chartHandlers } = require("../controllers");

router.route('/users')
  .get(userHandlers.verifyUser, userHandlers.all)
  .delete(userHandlers.verifyUser, userHandlers.delete)

router.route('/users/:id')
  .get(userHandlers.findUser)

router.route('/auth/sign_up')
  .post(userHandlers.sign_up);

router.route('/auth/sign_in')
  .post(userHandlers.sign_in);

router.route('/database')
  .get(dbHandlers.all)
  .post(dbHandlers.schema);

router.route('/database/get')
  .post(dbHandlers.findSchema);

router.route('/database/:userId')
  .post(dbHandlers.insertDb)

router.route('/database/:id/:table')
  .get(dbHandlers.fetchData)

router.route('/charts')
  .get(userHandlers.verifyUser, chartHandlers.fetchCharts)

router.route('/charts/create')
  .post( chartHandlers.addChart)

module.exports = router;
