const expressAsyncHandler = require("express-async-handler");
const { User} = require("../models");
const bcrypt = require('bcrypt');

exports.verifyUser = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: `email or password is missing!`,
      }); 
    }
  
    var user = await User.findOne({

      where: { 
        "email": email
      },
    });
    if(!user){
      return res.status(400).json({
        success: false,
        msg: `email is not correct!`,
      }); 
    }
  
    var result= bcrypt.compareSync(password, user.password);
    
    if(!result){
      return res.status(400).json({
        success: false,
        msg: `password is not correct!`,
      }); 
    }
  
    req.userObj = user;
  
    next();
  });