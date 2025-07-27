import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  otpVerificationTemplate,
  resetPasswordOTPTemplate,
} from "../utils/emailTemplate.utils.js";
import { sendVerificationOTP } from "../utils/sendVerificationOTP.js";
import transporter from "../utils/mailSender.js";
import crypto from "crypto";
dotenv.config();

const saltRounds = 10;

const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const signup = async (req, res) => {
  try {
    // fetch the user details
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = req.body;

    // validate user details
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: first name, last name, email, password, confirm password, and account type.",
      });
    }

    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "An account with this email already exists. Please log in or use another email.",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    //hash the user password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      accountType: accountType,
    });

    // send verification otp
    await sendVerificationOTP(email);

    res.status(201).json({
      success: true,
      data: newUser,
      message:
        "Signup successful! A verification OTP has been sent to your email address.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    //fetch the login details
    const { email, password } = req.body;

    //validate details
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, and password are required to login.",
      });
    }

    //check for existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "No account found with this email address. Please sign up first.",
      });
    }

    //check the password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    //check if the user account is verified
    if (!existingUser.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is not verified. Please verify your email before logging in.",
      });
    }

    //generate a token
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //create a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      data: existingUser,
      message: `Login successful. Welcome back, ${existingUser.firstName} `,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      message: "You have been logged out successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required for verification.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    if (otp !== user.accountVerificationOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    if (user.accountVerificationOTPExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new verification OTP.",
      });
    }

    user.isAccountVerified = true;
    user.accountVerificationOTP = undefined;
    user.accountVerificationOTPExpiresAt = undefined;
    await user.save();

    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({
      success: true,
      data: user,
      message: "Your account has been successfully verified.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to reset password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "If the email is registered, an OTP has been sent.",
      });
    }

    //generate otp
    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    //send email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Study-Notion | Reset Password OTP",
      html: resetPasswordOTPTemplate(user.firstName, otp),
    });

    return res.status(200).json({
      success: true,
      message: "A reset password OTP has been sent to your email address.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmNewPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, OTP, new password and confirm new password are required.",
      });
    }

    //check if new password and confirm new password matches
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password and Confirm New password does not match. Check the password again",
      });
    }

    //find the user with email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found with the provided email address.",
      });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    //check whether the previous password and new password are not same
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot be the same as your current password. Please choose a different one.",
      });
    }

    //verify otp
    if (otp !== user.resetPasswordOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check and try again.",
      });
    }

    //check token expiry
    if (user.resetPasswordOTPExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Your password has been successfully updated. Please log in using your new password.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
