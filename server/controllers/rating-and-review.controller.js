import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import RatingAndReview from "../models/rating-and-review.model.js";

export const addReview = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    //find the course
    const { id: courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "No Course found.",
      });
    }

    //fetch the review data
    const { body, rating } = req.body;
    if (!body || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    //check for duplicate reviews by same user
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this course.",
      });
    }

    const review = await RatingAndReview.create({
      body: body,
      rating: rating,
      user: userId,
      course: courseId,
    });

    //update the course model
    await Course.findByIdAndUpdate(
      { _id: review.course },
      {
        $push: {
          ratingAndReviews: review._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: review,
      message: "Review added successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { id: courseId } = req.params;

    const reviews = await RatingAndReview.find({ course: courseId }).populate(
      "user course"
    );

    return res.status(200).json({
      success: true,
      data: reviews,
      message: "Reviews data fetched.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    //find the review
    const { id: reviewId } = req.params;
    const review = await RatingAndReview.findById(reviewId);
    if (!review) {
      return res.status(400).json({
        success: false,
        message: "No Review found.",
      });
    }

    //check if the user reviewed only has access to update
    if (review.user.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot update review",
      });
    }

    //fetch the review data
    const { body, rating } = req.body;

    review.body = body || review.body;
    review.rating = rating || review.rating;
    await review.save();

    return res.status(200).json({
      success: true,
      data: review,
      message: "Review updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    //find the review
    const { id: reviewId } = req.params;
    const review = await RatingAndReview.findById(reviewId);
    if (!review) {
      return res.status(400).json({
        success: false,
        message: "No Review found.",
      });
    }

    //check if the user reviewed only has access to delete
    if (review.user.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete review",
      });
    }

    await review.deleteOne();
    //update the course model
    await Course.findByIdAndUpdate(
      { _id: review.course },
      {
        $pull: {
          ratingAndReviews: reviewId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
