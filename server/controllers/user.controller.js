import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getProfile = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId).populate("additionalDetails");
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
    //authenticate user
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "User is not authenticated. Please log in to update your profile.",
      });
    }

    //fetch profile details
    const { contact, gender, dob, bio, profession } = req.body;

    //validate profile details
    if (!contact || !gender || !dob || !bio || !profession) {
      return res.status(400).json({
        success: false,
        message:
          "All profile fields (contact, gender, date of birth, bio, and profession) are required.",
      });
    }

    const profileImage = req.file?.path;
    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required. Please upload a valid image file.",
      });
    }

    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be exactly 10 digits.",
      });
    }

    //save to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage, {
      folder: "study-notion",
    });

    if (user.additionalDetails) {
      //update profile
      const profile = await Profile.findOne({ _id: user.additionalDetails });
      if (
        profile &&
        user.additionalDetails.toString() === profile._id.toString()
      ) {
        profile.gender = gender || profile.gender;
        profile.contact = contact || profile.contact;
        profile.dob = dob || profile.dob;
        profile.bio = bio || profile.bio;
        profile.profession = profession || profile.profession;
        profile.profileImage =
          cloudinaryResponse.secure_url || profile.profileImage;

        await profile.save();

        return res.status(200).json({
          success: true,
          data: profile,
          message: "Profile updated successfully.",
        });
      }
    }

    const newProfile = await Profile.create({
      gender,
      contact,
      dob,
      bio,
      profession,
      profileImage: cloudinaryResponse.secure_url,
    });

    user.additionalDetails = newProfile._id;
    await user.save();

    return res.status(200).json({
      success: true,
      data: newProfile,
      message: "Profile created successfully.",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating profile. Please try again later.",
    });
  }
};

//only admins can delete this profile
export const deleteProfile = async (req, res) => {
  try {
    //authenticate user
    const userId = req.user._id;
    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(400).json({
        success: false,
        message:
          "User is not authenticated. Please log in to delete your profile.",
      });
    }

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

    user.additionalDetails = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile deleted.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
