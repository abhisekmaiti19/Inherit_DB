import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  newBatch,
  getBatch,
} from "../controllers/userController.js";

import { protect, protectAdmin } from "../middleware/authMiddleware.js";

router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/batch").post(protectAdmin, newBatch).get(getBatch);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
