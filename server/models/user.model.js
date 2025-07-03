import mongoose from "mongoose";
import crypto from "crypto";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      required: true,
    },
    additionalDetails: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    courseProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: "CourseProgress",
        default: [],
      },
    ],
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationOTP: {
      type: String,
    },
    accountVerificationOTPExpiresAt: {
      type: Date,
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordOTPExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateVerificationOTP = async function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.accountVerificationOTP = otp;
  this.accountVerificationOTPExpiresAt = Date.now() + 10 * 60 * 1000; //10 minutes
  await this.save();
  return otp ;
};

const User = mongoose.model("User", userSchema);
export default User;
