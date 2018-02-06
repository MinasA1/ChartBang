const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  { User } = require('../models'),
  secureRandom = require('secure-random');

const signingKey = secureRandom(256, {type: 'Buffer'});
var token;

exports.sign_up = function(req, res) {
  let newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err.errmsg
      });
    }
    return res.json({ message: 'User creation Success!' });
  });
};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      console.log(user, req.body.password);
      console.log(req.headers);
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    console.log(req.headers);
    token = jwt.sign({ email: user.email, name: user.name, _id: user._id }, signingKey);
    let options = {
      httpOnly: true,
      sign: true,
      secure: false,
      path: '/',
      domain: 'localhost'
    };
      res.cookie('access_token', token, options);
      res.cookie('user', req.body.email, { path: '/'});
    return res.json({message: 'Authentication Success'});
  });
};

exports.verifyUser = function(req, res, next) {
  console.log(req.headers);
  if (req.cookies['access_token'] && req.cookies['access_token'] === token) {
    console.log(req.cookies);
    console.log('Correct token');
    next();
  } else {
    console.log(req.headers.cookie, "IAM HEADERS COOKIE")
    console.log(req.cookies, "COOKIES")
    console.log(req.cookies['access_token'], " COOKIE");
    console.log(token, " TOKEN")
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


exports.delete = function(req, res) {
  User.findOneAndRemove({
    email: req.body.email
  }, function(err) {
    if (err) throw err;
    return res.json({ message: 'User Delete Success!'});
  });
};

exports.all = function(req, res) {
  User.find({}, function (err, u) {
    if (err) {
      console.log(err);
    } else {
    let users = {};
    u.forEach((user) => {
      user['password'] = undefined;
      users[user._id] = user;
    });
    res.send(users);
    console.log("USERS SENT");
      }
  });
};
