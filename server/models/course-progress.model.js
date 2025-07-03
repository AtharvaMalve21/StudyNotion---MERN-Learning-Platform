import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseProgressSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
