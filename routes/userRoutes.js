const express = require("express");
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  patchUser,
} = require("../controllers/user");
const { protect } = require("../middleware/protect");
const router = express.Router();

router.route("/").post(protect, createUser).get(protect, getUsers);
router
  .route("/:id")
  .patch(protect, patchUser)
  .get(protect, getOneUser)
  .delete(protect, deleteUser);

module.exports = router;


