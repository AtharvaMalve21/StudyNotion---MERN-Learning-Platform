import User from "../models/user.model.js";
import Section from "../models/section.model.js";
import SubSection from "../models/sub-section.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const createSubSection = async (req, res) => {
  try {
    //find the section
    const { id: sectionId } = req.params;
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        success: false,
        message: "No Section found.",
      });
    }

    //fetch the subsection details
    const { title, description, timeDuration } = req.body;

    //validate the details
    if (!title || !description || !timeDuration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const videoURL = req.file?.path;
    if (!videoURL) {
      return res.status(400).json({
        success: false,
        message: "VideoURL is required.",
      });
    }

    //upload it to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(videoURL, {
      resource_type: "video",
      folder: "study-notion/courses/lecture-videos",
    });

    //create entry into db
    const subSection = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoURL: cloudinaryResponse.secure_url,
    });

    //update the section model
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSection._id,
        },
      },
      { new: true }
    );

    fs.unlinkSync(videoURL);

    return res.status(201).json({
      success: true,
      data: subSection,
      message: "SubSection created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const showAllSubSections = async (req, res) => {
  try {
    const subSections = await SubSection.find({});

    return res.status(200).json({
      success: true,
      data: subSections,
      message: "Sub Section data fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateSubSection = async (req, res) => {
  try {
    //find the subsection
    const { id: subSectionId } = req.params;
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "No SubSection found.",
      });
    }

    //fetch details
    const { title, description, timeDuration } = req.body;
    const videoURL = req.file?.path;
    let cloudinaryResponse;
    if (videoURL) {
      cloudinaryResponse = await cloudinary.uploader.upload(videoURL, {
        folder: "study-notion/courses",
      });
    }
    //update the entry from db
    subSection.title = title || subSection.title;
    subSection.description = description || subSection.description;
    subSection.timeDuration = timeDuration || subSection.timeDuration;
    subSection.videoURL = cloudinaryResponse.secure_url || subSection.videoURL;
    await subSection.save();

    return res.status(200).json({
      success: true,
      data: subSection,
      message: "SubSection updated successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteSubSection = async (req, res) => {
  try {
    //find the subsection
    const { id: subSectionId } = req.params;
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "No SubSection found.",
      });
    }

    //delete entry from db
    await subSection.deleteOne();

    //update the section
    await Section.updateMany(
      { subSection: subSectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
