import mongoose from "mongoose";
const batchSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  regStart: {
    type: String,
    required: true,
    default: "2023-08-01T00:00:00.000Z",
  },
  regEnd: {
    type: String,
    required: true,
    default: "2023-08-01T00:00:00.000Z",
  },
  batchImg: {
    type: String,
    required: false,
    default: "https://",
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
