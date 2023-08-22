import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: "anonymous",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone: {
      type: Number,
      required: false,
      default: 123456789,
    },
    about: {
      type: String,
      required: false,
      default: "Write your about",
    },
    college: {
      type: String,
      required: false,
      default: "Your College name",
    },
    course: {
      type: String,
      required: false,
      default: "Your Course name",
    },
    yog: {
      type: Number,
      required: false,
      default: 0,
    },
    cgpa: {
      type: Number,
      required: false,
      default: 0,
    },
    company: {
      type: String,
      required: false,
      default: "Inherit",
    },
    role: {
      type: String,
      required: false,
      default: "Your role",
    },
    start_date: {
      type: Date,
      required: false,
      default: "2023-08-01",
    },
    end_date: {
      type: Date,
      required: false,
      default: "2023-08-01",
    },
    resume: {
      type: String,
      required: false,
      default: "https://abc",
    },
    photo: {
      type: String,
      required: false,
      default: "https://abc",
    },
    skills: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//before user added into the data base
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

//
