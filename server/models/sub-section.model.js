import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeDuration: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SubSection = mongoose.model("SubSection", subSectionSchema);
export default SubSection;
