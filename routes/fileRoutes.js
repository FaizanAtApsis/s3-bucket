const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { createFile, getFilesByUser, getFilesByBucket, getOneFile, deleteFile, patchFile, getAllFiles } = require("../controllers/file");
const { protect } = require("../middleware/protect");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/uploads`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    req.fileError = false;
    if (
      !path
        .extname(file.originalname)
        .toLocaleLowerCase()
        .match(/\.(jpg|jpeg|png|gif|xlsx|pdf|docx)$/)
    ) {
      req.fileErrorMessage = `${file.originalname} is invalid. Only  image,pdf,docx,xlsx files are acceptable`;
      req.fileError = true;
    }
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadFilesMultiple = multer({ storage: storage });

router.route("/").post([protect,uploadFilesMultiple.any("files")],createFile).get([protect],getAllFiles)
router.route("/:id").get([protect],getOneFile).delete(protect,deleteFile).patch(protect,patchFile)
router.route("/user/:id").get([protect],getFilesByUser)
router.route("/bucket/:id").get([protect],getFilesByBucket)

module.exports = router;
