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
    },
    about: {
      type: String,
      required: false,
    },
    college: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    yog: {
      type: Number,
      required: false,
      default: new Date().getFullYear,
    },
    cgpa: {
      type: Number,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    resume: {
      type: String,
      required: false,
      default: null,
    },
    photo: {
      type: String,
      required: false,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
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
