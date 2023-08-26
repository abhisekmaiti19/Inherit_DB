import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Batch from "../models/batchModel.js";
import Application from "../models/applicationModel.js";
import generateToken from "../utils/generateToken.js";

//@ desc AUTH user/set token
// route POST /api/user/auth
// @access Public

let userActive = false;

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, {
      userId: user._id,
      isAdmin: user.isAdmin,
    });
    res.status(201).json({
      user: {
        _id: user._id,
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
      },
      token,
    });
  } else {
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
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(res, {
      userId: user._id,
      isAdmin: user.isAdmin,
    });
    res.status(201).json({
      user: {
        _id: user._id,
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
      },
      token,
    });
  } else {
    res.status(400);
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
  res.status(200).json({ message: "User Logged out" });
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

    const token = generateToken(res, {
      userId: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    });
    res.status(200).json({
      user: {
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
      },
      token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // res.status(200).json({ user });
});

const newBatch = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id);
  const {
    courseName,
    batchStart,
    regEnd,
    batchImg,
    description,
    eligibility,
    teacher,
  } = await req.body;

  const batch = await Batch.create({
    courseName,
    batchStart,
    regEnd,
    batchImg,
    description,
    eligibility,
    teacher,
  });

  res.status(201).json({
    courseName: batch.courseName,
    batchStart: batch.batchStart,
    regEnd: batch.regEnd,
    batchImg: batch.batchImg,
    description: batch.description,
    eligibility: batch.eligibility,
    teacher: batch.teacher,
  });
});

const getBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.find({});
  res.status(200).json(batch);
  // else res.status(401).json({ message: "Login/signup first" });
});

//PUT APPLICATION FOR STUDENT
const putApplication = asyncHandler(async (req, res) => {
  //changes in body....

  const application = await Application.findOne({
    userId: req.body.userId,
    batchId: req.body.batchId,
  });
  if (application) {
    application.isShortlistedForExam =
      req.body.isShortlistedForExam || application.isShortlistedForExam;
    application.examLink = req.body.examLink || application.examLink;
    application.isShortlistedForInterview =
      req.body.isShortlistedForInterview ||
      application.isShortlistedForInterview;
    application.interviewLink =
      req.body.interviewLink || application.interviewLink;
    application.isAccepted = req.body.isAccepted || application.isAccepted;

    const newApplication = await application.save();

    res.status(200).json({
      userId: newApplication.userId,
      batchId: newApplication.batchId,
      isShortlistedForExam: newApplication.isShortlistedForExam,
      examLink: newApplication.examLink,
      isShortlistedForInterview: newApplication.isShortlistedForInterview,
      interviewLink: newApplication.interviewLink,
      isAccepted: newApplication.isAccepted,
    });
  } else {
    res.status(401).json("Application not found");
  }
});

const postApplication = asyncHandler(async (req, res) => {
  //changes in body....
  const application = await Application.findOne({
    userId: req.body.userId,
    batchId: req.body.batchId,
  });
  if (application) {
    res.status(401).json("Application Found");
  } else {
    const newApplication = await Application.create({
      userId: req.body.userId,
      batchId: req.body.batchId,
    });
    res.status(200).json({
      userId: newApplication.userId,
      batchId: newApplication.batchId,
      isShortlistedForExam: newApplication.isShortlistedForExam,
      examLink: newApplication.examLink,
      isShortlistedForInterview: newApplication.isShortlistedForInterview,
      interviewLink: newApplication.interviewLink,
      isAccepted: newApplication.isAccepted,
    });
  }
});

const getApplication = asyncHandler(async (req, res) => {
  //changes in body....
  //changes

  // const user = await User.findById(req.body.userId);
  // console.log(user._id);

  const application = await Application.findOne({ userId: req.body.userId });
  if (application) {
    const user = await User.findById(req.body.userId);
    res.status(200).json({
      userId: application.userId,
      user,
      batchId: application.batchId,
      isShortlistedForExam: application.isShortlistedForExam,
      examLink: application.examLink,
      isShortlistedForInterview: application.isShortlistedForInterview,
      interviewLink: application.interviewLink,
      isAccepted: application.isAccepted,
    });
  } else {
    res.status(401).json("Application Not Found");
  }
});

const getAllApplication = asyncHandler(async (req, res) => {
  const application = await Application.find({});
  const arr = [];

  for (let i = 0; i < application.length; i++) {
    // console.log(application[i].userId);
    try {
      const user = await User.findById(application[i].userId);
      arr.push({ user, ...application[i]._doc });
    } catch (e) {
      arr.push({ ...application[i]._doc });
    }
    // console.log(user);
  }
  res.status(200).json(arr);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  newBatch,
  getBatch,
  getApplication,
  getAllApplication,
  putApplication,
  postApplication,
};
