import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Category from "../models/category.model.js";
import RatingAndReview from "../models/rating-and-review.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const createCourse = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "Only instructors can create a course.",
      });
    }

    //fetch course details
    const { courseName, courseDescription, whatWillYouLearn, price, category } =
      req.body;

    //validate details
    if (
      !courseName ||
      !courseDescription ||
      !whatWillYouLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All course fields are required.",
      });
    }

    const thumbnail = req.file?.path;
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required.",
      });
    }

    //upload thumbnail to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(thumbnail, {
      folder: "study-notion",
    });

    //optional - check for existing course
    // const existingCourse = await Course.findOne({ courseName: courseName });
    // if (existingCourse) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Course already exists with given name.",
    //   });
    // }

    //fetch the category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid category selected.",
      });
    }

    //create course
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      whatWillYouLearn: whatWillYouLearn,
      price: price,
      thumbnail: cloudinaryResponse.secure_url,
      category: categoryDetails._id,
      instructor: userId,
    });

    //update the user model
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the category model
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    fs.unlinkSync(thumbnail);

    return res.status(201).json({
      success: true,
      data: newCourse,
      message: "Course added successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create course. " + err.message,
    });
  }
};

export const showAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate(
      "instructor category studentsEnrolled ratingAndReviews"
    );

    return res.status(200).json({
      success: true,
      data: courses,
      message: "Courses data fetched.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const filterCoursesByCategory = async (req, res) => {
  try {
    const { query } = req.query;

    const courses = await Course.find({ category: query });

    return res.status(200).json({
      success: true,
      data: courses,
      message: "Coures filtered by category.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateExistingCourse = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can update courses.",
      });
    }

    //find the course
    const { id: courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course not found.",
      });
    }

    //fetch the  course details
    const { courseName, courseDescription, whatWillYouLearn, price, category } =
      req.body;

    const thumbnail = req.file?.path;

    let cloudinaryResponse;
    if (thumbnail) {
      cloudinaryResponse = await cloudinary.uploader.upload(thumbnail, {
        folder: "study-notion",
      });
    }

    //find the category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        mesage: "Invalid category selected.",
      });
    }

    //find the instructor who created the course can only update it
    if (course.instructor.toString() !== userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Instructor cannot update this course.",
      });
    }

    course.courseName = courseName || course.courseName;
    course.courseDescription = courseDescription || course.courseDescription;
    course.whatWillYouLearn = whatWillYouLearn || course.whatWillYouLearn;
    course.price = price || course.price;
    course.thumbnail = cloudinaryResponse.secure_url || course.thumbnail;
    course.category = categoryDetails._id || course.category;
    await course.save();

    if (thumbnail) {
      fs.unlinkSync(thumbnail);
    }

    return res.status(200).json({
      success: true,
      data: course,
      message: "Course updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteExistingCourse = async (req, res) => {
  try {
    //authenticate the user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "Only instructors can delete courses.",
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

    //find the instructor who created the course can only delete it
    if (course.instructor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course.",
      });
    }

    await course.deleteOne();

    //update the user model
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    //update the category
    await Category.findByIdAndUpdate(
      { _id: course.category },
      {
        $pull: {
          courses: courseId,
        },
      },
      { new: true }
    );

    //update the rating and review model
    await RatingAndReview.deleteMany({ course: courseId });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//optional - students enrolled to courses
export const studentEnrolledCourse = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        message: "No Student registered with the given email address.",
      });
    }

    //find the course
    const { id: courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "No Course found with the provided id.",
      });
    }

    // Check if already enrolled
    if (user.courses.includes(course._id)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }

    //update the user model
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $push: {
          courses: course._id,
        },
      }
    );

    //update the course model
    await Course.findByIdAndUpdate(
      { _id: course._id },
      {
        $push: {
          studentsEnrolled: user._id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: `Congratulations ${user.firstName}. You have successfully enrolled in the course ${course.courseName}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
