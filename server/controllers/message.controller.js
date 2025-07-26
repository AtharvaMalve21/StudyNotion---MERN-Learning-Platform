import User from "../models/user.model.js";
import transporter from "../utils/mailSender.js";
import { contactUsTemplate } from "../utils/emailTemplate.utils.js";

export const sendMessage = async (req, res) => {
  try {
    const user = req.user._id;

    //fetch the details
    const { firstName, lastName, email, phone, message } = req.body;

    //validate the details
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields.",
      });
    }

    //validate phone number
    if (phone.length != 10) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid phone number",
      });
    }

    //send the mail
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `StudyNotion | New Inquiry from ${user.firstName} ${user.lastName}`,
      html: contactUsTemplate(
        user.firstName,
        user.lastName,
        user.email,
        user.message
      ),
    });

    return res.status(200).json({
      success: true,
      message:
        "Thanks for reaching out! Our team will review your message and respond soon.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
