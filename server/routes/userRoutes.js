import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  newBatch,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/batch", newBatch);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
