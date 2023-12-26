exports.Error404 = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

exports.Error500 = (error, req, res, next) => {
  res.status(error.status || 500);
  console.log(error);

  if (error.name === "SequelizeValidationError") {
    return res.json({
      success: false,
      msg: error.errors.map((err) => err.message),
    });
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.json({
      success: false,
      msg: error.errors.map((err) => err.message),
    });
  }

  res.json({ success: false, msg: error.message });
};
