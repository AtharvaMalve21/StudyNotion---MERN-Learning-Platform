import { razorpayInstance } from "../config/razorpay.config.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Order from "../models/order.model.js";
import crypto from "crypto";
import transporter from "../utils/mailSender.js";
import { courseEnrolledTemplate } from "../utils/emailTemplate.utils.js";

export const createPayment = async (req, res) => {
  try {
    //find the user
    const userId = req.user._id;

    //find the course
    const { id: courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "No Course found with the provided id.",
      });
    }

    //check if the user already enrolled in the course
    const existingCourseEnrollement = course.studentsEnrolled.find(
      (c) => c._id.toString() === userId.toString()
    );

    if (existingCourseEnrollement) {
      return res.status(400).json({
        success: false,
        message: "User has already enrolled in this course.",
      });
    }

    //create an options
    const options = {
      amount: course.price * 100,
      currency: process.env.CURRENCY,
      receipt: course._id.toString(),
      notes: {
        userId: userId,
        courseId: courseId,
      },
    };

    const paymentResponse = await razorpayInstance.orders.create(options);

    console.log(paymentResponse);

    //create an entry into the order model
    const order = await Order.create({
      user: userId,
      course: courseId,
      razorpay_order_id: paymentResponse.id,
    });

    return res.status(200).json({
      success: true,
      order,
      razorpayOrderId: paymentResponse.id,
      amount: paymentResponse.amount,
      currency: paymentResponse.currency,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Signature verification failed. Payment not authentic.",
      });
    }

    //if the payment suceeds
    const order = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(order);

    const { userId, courseId } = order.notes;

    //enroll user to the course
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
        },
      },
      { new: true }
    );

    //add course inside user model
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          studentsEnrolled: userId,
        },
      },
      { new: true }
    );

    //update the orders model
    await Order.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        paymentStatus: "Paid",
      },
      { new: true }
    );

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    //send the email
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: `✨ You've unlocked access to "${course.courseName}" – dive in!`,
      html: courseEnrolledTemplate(
        user.firstName,
        user.lastName,
        course.courseName
      ),
    });

    return res.status(200).json({
      success: true,
      message: "Payment is successfull.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
