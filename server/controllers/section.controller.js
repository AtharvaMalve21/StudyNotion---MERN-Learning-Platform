import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Section from "../models/section.model.js";

export const createSection = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "Instructor not found.",
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

    //fetch the section details
    const { sectionName } = req.body;

    //validate the details
    if (!sectionName) {
      return res.status(400).json({
        success: false,
        message: "Section Name is required.",
      });
    }

    const existing = await Section.findOne({ sectionName });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A section with this name already exists.",
      });
    }

    //create entry into db
    const section = await Section.create({
      sectionName: sectionName,
      subSection: [],
    });

    //update the course model
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: section._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: section,
      message: "Section added successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const showAllSections = async (req, res) => {
  try {
    const sections = await Section.find({});
    return res.status(200).json({
      success: true,
      data: sections,
      message: "Section data fetched.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateExistingSection = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "Instructor not found.",
      });
    }

    //find the section
    const { id: sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        success: false,
        message: "No section found",
      });
    }

    //fetch the section details
    const { sectionName } = req.body;

    section.sectionName = sectionName || section.sectionName;
    await section.save();

    return res.status(200).json({
      success: true,
      data: section,
      message: "Section updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteExistingSection = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user || user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "Instructor not found.",
      });
    }

    //find the section
    const { id: sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        success: false,
        message: "No section found",
      });
    }

    await section.deleteOne();

    //update the course model
    await Course.updateMany(
      { courseContent: sectionId },
      {
        $pull: {
          courseContent: sectionId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
