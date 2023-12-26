const express = require("express");
const { createBucket, getBuckets, getOneBucket, deleteBucket, patchBucket, getBucketsByUser } = require("../controllers/bucket");
const { protect } = require("../middleware/protect");
const router = express.Router();

router.route("/").post(protect,createBucket).get(protect,getBuckets);
router.route("/:id").patch(protect,patchBucket).get(protect,getOneBucket).delete(protect,deleteBucket);
router.route("/user/:id").get(protect,getBucketsByUser);


module.exports = router