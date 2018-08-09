require('babel-register');
const express = require('express');
let routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

let { User } = require('./models');

app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//  res.header('Access-Control-Allow-Credentials', true);
//  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept,X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//  next();
//});
app.use(cors({ origin: 'https://chartbang.com', credentials: true }));
app.use('/v1', routes);

app.listen(process.env.PORT || 3000, function(){
    console.log("App running on port 3000");
});
