const express = require('express');
let router = express.Router();
let { Database } = require('../models');
let { userHandlers, dbHandlers } = require("../controllers");

router.route('/users')
  .get(userHandlers.verifyUser, userHandlers.all)
  .delete(userHandlers.verifyUser, userHandlers.delete);

router.route('/auth/sign_up')
  .post(userHandlers.sign_up);

router.route('/auth/sign_in')
  .post(userHandlers.sign_in);

router.route('/database')
  .post(userHandlers.verifyUser, dbHandlers.readSchema);
module.exports = router;
