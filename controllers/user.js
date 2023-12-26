const expressAsyncHandler = require("express-async-handler");
const GenericMethods = require("../utils/genericMethods");
const { User } = require("../models");
const bcrypt = require("bcrypt");


exports.createUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(500)
        .json({ success: false, msg: "Email address already in use!" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash;
    const insertdata = {
      ...req.body,
    };

    return await GenericMethods.CreateData(User, insertdata, req, res);
  } catch (error) {
    console.log(error);
    return GenericMethods.response(
      "Server Error! Check Logs.",
      true,
      [],
      res,
      500
    );
  }
});

exports.getUsers = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(User, {}, res, null);
  } catch (error) {
    console.log(error);
    return GenericMethods.response(
      "Server Error! Check Logs.",
      true,
      [],
      res,
      500
    );
  }
});

exports.getOneUser = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetSingleData(
      User,
      { where: { id: req.params.id } },
      res
    );
  } catch (error) {
    console.log(error);
    return GenericMethods.response(
      "Server Error! Check Logs.",
      true,
      [],
      res,
      500
    );
  }
});

exports.deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.DeleteData(
      User,
      { where: { id: req.params.id } },
      req,
      res
    );
  } catch (error) {
    console.log(error);
    return GenericMethods.response(
      "Server Error! Check Logs.",
      true,
      [],
      res,
      500
    );
  }
});

exports.patchUser = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.body.email)
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(500)
        .json({ success: false, msg: "Email address already in use!" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash;
    const insertdata = {
      ...req.body,
    };
    return await GenericMethods.UpdateData(
      User,
      insertdata,
      { where: { id: req.params.id } },
      req,
      res
    );
  } catch (error) {
    console.log(error);
    return GenericMethods.response(
      "Server Error! Check Logs.",
      true,
      [],
      res,
      500
    );
  }
});

exports.loginUser = expressAsyncHandler(async (req, res) => {

    const token = req.userObj.getSignedJwtToken(req.userObj.id);
    return res.status(200).json({
      success: true,
      data:{
        access_token: token,
        userObj: req.userObj
      }
    });
  });