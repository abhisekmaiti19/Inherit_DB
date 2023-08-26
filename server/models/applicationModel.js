import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const applicationSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  batchId: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  isShortlistedForExam: {
    type: Boolean,
    required: false,
    default: false,
  },
  examLink: {
    type: String,
    required: false,
  },

  isShortlistedForInterview: {
    type: Boolean,
    required: false,
    default: false,
  },

  interviewLink: {
    type: String,
    required: false,
  },

  isAccepted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const application = mongoose.model("Applications", applicationSchema);
export default application;
