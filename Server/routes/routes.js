const express = require('express');
let router = express.Router();
let { Database } = require('../models');
let { userHandlers, dbHandlers } = require("../controllers");

router.route('/users')
  .get(userHandlers.verifyUser, userHandlers.all)
  .delete(userHandlers.verifyUser, userHandlers.delete);
router.route('/users/:id')
  .get(userHandlers.findUser)
router.route('/auth/sign_up')
  .post(userHandlers.sign_up);

router.route('/auth/sign_in')
  .post(userHandlers.sign_in);

router.route('/database')
  .get(dbHandlers.all)
  .post(userHandlers.verifyUser, dbHandlers.schema);

router.route('/database/:userId')
  .post(dbHandlers.insertDb)

router.route('/database/:id/:table')
  .get(dbHandlers.fetchData)
module.exports = router;
