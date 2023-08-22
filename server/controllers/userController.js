import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Batch from "../models/batchModel.js";
import generateToken from "../utils/generateToken.js";

//@ desc AUTH user/set token
// route POST /api/user/auth
// @access Public

let userActive = false;

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    userActive = true;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    userActive = false;
    res.status(401);
    throw new Error("Invalid email/password");
  }
});

//@ desc Register a new user
// route POST /api/userss
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    userActive = false;
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    userActive = true;
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    userActive = false;
    throw new Error("Invalid user data");
  }
  res.status(200).json({ message: "Register user" });
});

//@ desc Logout user
// route POST /api/logout
// @access Public
const logoutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  userActive = false;
  res.status(400).json({ message: "User Logged out" });
});

//@ desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    phone: user.phone,
    about: user.about,
    college: user.college,
    course: user.course,
    yog: user.yog,
    cgpa: user.cgpa,
    company: user.company,
    role: user.role,
    start_date: user.start_date,
    end_date: user.end_date,
    resume: user.resume,
    photo: user.photo,
    skills: user.skills,
  });
});

//@ desc update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.phone = req.body.phone || user.phone;
    user.about = req.body.about || user.about;
    user.college = req.body.college || user.college;
    user.course = req.body.course || user.course;
    user.yog = req.body.yog || user.yog;
    user.cgpa = req.body.cgpa || user.cgpa;
    user.company = req.body.company || user.company;
    user.role = req.body.role || user.role;
    user.start_date = req.body.start_date || user.start_date;
    user.end_date = req.body.end_date || user.end_date;
    user.resume = req.body.resume || user.resume;
    user.photo = req.body.photo || user.photo;
    user.skills = req.body.skills || user.skills;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      about: updatedUser.about,
      college: updatedUser.college,
      course: updatedUser.course,
      yog: updatedUser.yog,
      cgpa: updatedUser.cgpa,
      company: updatedUser.company,
      role: updatedUser.role,
      start_date: updatedUser.start_date,
      end_date: updatedUser.end_date,
      resume: updatedUser.resume,
      photo: updatedUser.photo,
      skills: updatedUser.skills,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // res.status(200).json({ user });
});

const newBatch = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  const { courseName, regStart } = await req.body;
  if (userActive === true) {
    const batch = await Batch.create({
      courseName,
      regStart,
    });

    res.status(201).json({ message: "Course Created" });
  } else {
    res.status(401).json({ message: "Signup/Login first" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  newBatch,
};
