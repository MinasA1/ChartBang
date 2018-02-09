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
  }).populate('databases').exec(function(err, user){
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
      token = jwt.sign({ email: user.email, name: user.name, _id: user._id }, signingKey);
    let options = {
      httpOnly: true,
      sign: true,
      secure: false,
      path: '/',
      domain: 'localhost'
    };
      console.log(user);
      user.password = undefined;
      res.cookie('access_token', token, options);
      res.cookie('user', req.body.email, { path: '/'});
    return res.json(user);
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

exports.all = async function(req, res) {
  const user = await User.find()
  user.map(v => v.password = undefined)
  res.json(user)
};

exports.findUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(user.databases)
  res.json(user)
}