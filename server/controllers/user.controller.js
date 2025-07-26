import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Course from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const getProfile = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "User is not authenticated. Please log in to view profile details.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "User profile details fetched successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching user details. Please try again later.",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Please log in.",
      });
    }

    const { contact, gender, dob, bio, profession } = req.body;
    const profileImage = req.file?.path;

    // Validate all required fields
    if (!contact || !gender || !dob || !bio || !profession) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be exactly 10 digits.",
      });
    }

    let cloudinaryResponse;
    if (profileImage) {
      // Upload to cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(profileImage, {
        folder: "study-notion/users",
      });
      fs.unlinkSync(profileImage);
    }

    // Either update or create profile
    let profile;
    if (user.additionalDetails) {
      profile = await Profile.findById(user.additionalDetails);
      profile.gender = gender;
      profile.contact = contact;
      profile.dob = dob;
      profile.bio = bio;
      profile.profession = profession;
      profile.profileImage = cloudinaryResponse
        ? cloudinaryResponse.secure_url
        : "";
      await profile.save();
    } else {
      profile = await Profile.create({
        gender,
        contact,
        dob,
        bio,
        profession,
        profileImage: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
      });

      user.additionalDetails = profile._id;
      await user.save();
    }

    // Clean up local file
    if (profileImage) {
      fs.unlinkSync(profileImage);
    }

    return res.status(200).json({
      success: true,
      data: profile,
      message: "Profile updated successfully.",
    });
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile.",
    });
  }
};

//only admins can delete this user account
export const deleteAccount = async (req, res) => {
  try {
    //find the user profile
    const { id: profileId } = req.params;
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Profile not found with provided id.",
      });
    }

    await profile.deleteOne();

    //find the associated user and delete
    const user = await User.findOne({ additionalDetails: profile._id });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User profile not found.",
      });
    }

    //also delete the user account
    await user.deleteOne();

    //also update the courses model
    await Course.updateMany(
      { studentsEnrolled: user._id },
      { $pull: { studentsEnrolled: user._id } }
    );

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
