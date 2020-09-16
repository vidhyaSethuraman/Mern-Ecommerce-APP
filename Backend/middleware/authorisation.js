const jwt = require('jsonwebtoken');
//const cookieParser = require('cookie-parser');
const Customer = require("../models/customers");

const authorize = (req, res, next) => {
 console.log("in authooooo");
  //const token = req.cookies.jwt;
  //var token = req.query.jwt;
  const token = req.headers.authorization;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'camilla miller webapp', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.auth = null;
        //res.redirect('/login');
        next();
      } else {
        //console.log(decodedToken);
        res.locals.auth = true;
        next();
      }
    });
  } else {
    res.locals.auth = null;
    //res.redirect('/login');
    next();
  }
};


const checkUser = async(req, res, next) => {
  console.log("IN CHECK USERRRRRRRR");
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  //const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, 'camilla miller webapp', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Customer.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authorize, checkUser };