const expressAsyncHandler = require("express-async-handler");
const GenericMethods = require("../utils/genericMethods");
const { Bucket, File } = require("../models");

exports.createBucket = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.CreateData(Bucket, req.body, req, res);
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

exports.getBuckets = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(Bucket, {}, res, null);
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

exports.getBucketsByUser = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(
      Bucket,
      {
        where: { user_id: req.params.id },
        include: [{ model: File }],
      },
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

exports.getOneBucket = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetSingleData(
      Bucket,
      { where: { id: req.params.id }, include: [{ model: File }], },
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

exports.deleteBucket = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.DeleteData(
      Bucket,
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

exports.patchBucket = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.body.email);
    const Bucket = await Bucket.findOne({ where: { email: req.body.email } });
    if (Bucket) {
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
      Bucket,
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
