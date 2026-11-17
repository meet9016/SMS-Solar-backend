var express = require("express");
var router = express.Router();
const createUploader = require("../utils/multer");
const upload = createUploader("images/UserProfileImages");

const authMiddleware = require("../middleware/auth");
const { authorize } = require("../middleware/permissions");
const { createUser, loginUser, fetchAllUsers, userDelete, userUpdate, fetchUserById, getCurrentUser, fetchSalesExecutives } = require("../controller/user");
const { changePassword } = require("../controller/staff");

router.post("/add-user", upload.single("profileImage"), createUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);
router.put("/change-password", authMiddleware, changePassword);

router.get("/sales-executives", authMiddleware, fetchSalesExecutives);

router.get(
  "/",
  authMiddleware,
  authorize("staff", "readAll"),
  fetchAllUsers,
);
router.get(
  "/:id",
  authMiddleware,
  authorize("staff", "readAll"),
  fetchUserById,
);
router.put(
  "/:id",
  upload.single("profileImage"),
  authMiddleware,
  authorize("staff", "update"),
  userUpdate,
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("staff", "delete"),
  userDelete,
);
module.exports = router;
