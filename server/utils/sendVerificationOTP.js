import User from "../models/user.model.js";
import transporter from "./mailSender.js";
import { otpVerificationTemplate } from "./otpVerificationTemplate.js";

export const sendVerificationOTP = async (email) => {
  try {
    const user = await User.findOne({ email });

    const otp = await user.generateVerificationOTP();

    //send email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Study-Notion | Account Verification OTP",
      html: otpVerificationTemplate(user.firstName, otp),
    });
  } catch (err) {
    console.log(`Something went wrong... ${err.message}`);
  }
};
