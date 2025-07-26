import mongoose from "mongoose";
const Schema = mongoose.Schema;

  const ratingAndReviewSchema = new Schema(
    {
      body: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    },
    { timestamps: true }
  );

const RatingAndReview = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);
export default RatingAndReview;
