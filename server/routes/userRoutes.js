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
  getAllApplication,
  putApplication,
  getApplication,
  postApplication,
} from "../controllers/userController.js";

import { protect, protectAdmin } from "../middleware/authMiddleware.js";

router.post("/signup", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/batch").post(protectAdmin, newBatch).get(protectAdmin, getBatch);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/application")
  .get(protect, getApplication)
  .post(protect, postApplication);
router
  .route("/applications")
  .get(protectAdmin, getAllApplication)
  .put(protectAdmin, putApplication);

export default router;
