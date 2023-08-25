import mongoose from "mongoose";
const batchSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  batchStart: {
    type: Date,
    required: true,
  },
  regEnd: {
    type: Date,
    required: true,
  },
  batchImg: {
    type: String,
    required: false,
    default:
      "https://img.freepik.com/free-vector/online-certification-with-books-glasses_23-2148571394.jpg",
  },
  description: {
    type: String,
    required: false,
    default: "This is my batch Description",
  },
  eligibility: {
    type: Array,
    require: true,
    default: ["B.Tech", "CSE"],
  },
  teacher: {
    type: String,
    required: false,
    default: "Richa Arora",
  },
});

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
