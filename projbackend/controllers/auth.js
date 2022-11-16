const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var ExpressJwt = require('express-jwt');


exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exist",
      });
    }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "USER email and Password does not exist",
        });
      }

      //creat a token
      const token = jwt.sign({_id:user._id},process.env.SECRET);
      //put token in coockie
       res.cookie("token",token,{expire:new Date() +(10*60*60)});
      // response to frontend
      const {_id,name,email,role} = user;
      res.json({token,user:{_id,name,email,role}});
    
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Your account has sign outed",
  });
};

//protected Routes
exports.isSignedIn = ExpressJwt({
  secret:process.env.SECRET,
  userProperty:"auth"
});

//custom middleware

exports.isAuthenitcated = (req,res,next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status('403').json({
      error:"ACCESS DENIED"
    });
  }
 next(); 
}

exports.isAdmin = (req,res,next) => {
  if(req.profile.role === 0){
    return res.status('403').json({
      error:"You are not admin"
    })
  }
  next(); 
 }