const expressAsyncHandler = require("express-async-handler");
const GenericMethods = require("../utils/genericMethods");
const { File, Bucket } = require("../models");
const { path } = require("path");

exports.createFile = expressAsyncHandler(async (req, res) => {
  try {
    var filebody = req.files;
    var dirPath = "";
    if (filebody.length > 0) {
      dirPath = `/public/uploads/${filebody[0].filename}`;
    }

    return await GenericMethods.CreateData(
      File,
      { name: dirPath, bucket_id: req.body.bucket_id },
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

exports.getFiles = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(File, {}, res, null);
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

exports.getFilesByUser = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(
      File,
      { include: [{ model: Bucket, where: { user_id: req.params.id } }] },
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

exports.getFilesByBucket = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetAllData(
      File,
      { where: { bucket_id: req.params.id } },
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

exports.getOneFile = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetSingleData(
      File,
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

exports.getAllFiles = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.GetSingleData(
      File,
      { where: { id: req.params.id }, include: [{ model: Bucket }] },
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

exports.deleteFile = expressAsyncHandler(async (req, res) => {
  try {
    return await GenericMethods.DeleteData(
      File,
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

exports.patchFile = expressAsyncHandler(async (req, res) => {
  try {
    var filebody = req.files;
    var dirPath = "";
    if (filebody.length > 0) {
      dirPath = `/public/uploads/${filebody[0].filename}`;
    }
    const insertdata = {
      name: dirPath,
      bucket_id: req.body.bucket_id,
    };
    return await GenericMethods.UpdateData(
      File,
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
