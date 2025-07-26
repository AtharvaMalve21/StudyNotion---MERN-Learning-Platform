export const otpVerificationTemplate = (firstName, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Account Verification - StudyNotion</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .heading {
          font-size: 24px;
          font-weight: bold;
          color: #2d3748;
        }
        .paragraph {
          font-size: 16px;
          color: #4a5568;
          margin-top: 20px;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          color: #1a202c;
          background-color: #edf2f7;
          padding: 12px 20px;
          border-radius: 6px;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 4px;
        }
        .footer {
          font-size: 14px;
          color: #a0aec0;
          margin-top: 40px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="heading">Account Verification - StudyNotion</div>
        <div class="paragraph">Hi ${firstName},</div>
        <div class="paragraph">
          Thank you for signing up on <strong>StudyNotion</strong>! To complete your registration, please use the following One-Time Password (OTP) to verify your email address:
        </div>
        <div class="otp">${otp}</div>
        <div class="paragraph">
          This OTP is valid for the next <strong>10 minutes</strong>. If you did not initiate this request, you can safely ignore this email.
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
};

export const resetPasswordOTPTemplate = (firstName, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password - StudyNotion</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .heading {
          font-size: 24px;
          font-weight: bold;
          color: #2d3748;
        }
        .paragraph {
          font-size: 16px;
          color: #4a5568;
          margin-top: 20px;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          color: #1a202c;
          background-color: #edf2f7;
          padding: 12px 20px;
          border-radius: 6px;
          text-align: center;
          margin: 20px 0;
          letter-spacing: 4px;
        }
        .footer {
          font-size: 14px;
          color: #a0aec0;
          margin-top: 40px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="heading">Reset Your Password - StudyNotion</div>
        <div class="paragraph">Hi ${firstName},</div>
        <div class="paragraph">
          We received a request to reset your password for your <strong>StudyNotion</strong> account. Use the OTP below to proceed:
        </div>
        <div class="otp">${otp}</div>
        <div class="paragraph">
          This OTP is valid for <strong>10 minutes</strong>. If you didn’t request a password reset, please ignore this email or contact support.
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
};

export const courseEnrolledTemplate = ({ firstName, lastName, courseName }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px; color: #212529;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h2 style="color: #0d6efd;">🎓 Course Enrollment Confirmation</h2>
      </div>

      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="font-size: 16px;">Hi <strong>${firstName} ${lastName}</strong>,</p>

        <p style="font-size: 16px; line-height: 1.5;">
          Congratulations! You have successfully enrolled in the course: 
          <strong style="color: #0d6efd;">${courseName}</strong>.
        </p>

        <p style="font-size: 15px; line-height: 1.5; margin-top: 10px;">
          You can now access all the course materials and start learning at your own pace. We're excited to have you onboard and hope this journey is full of learning and growth.
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://yourplatform.com/dashboard" style="background-color: #0d6efd; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Go to Dashboard
          </a>
        </div>

        <p style="font-size: 14px; margin-top: 30px; color: #6c757d;">
          If you have any questions, feel free to contact our support team.
        </p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #adb5bd; margin-top: 30px;">
        &copy; ${new Date().getFullYear()} Your Platform Name. All rights reserved.
      </div>
    </div>
  `;
};

export const contactUsTemplate = ({ firstName, lastName, email, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f7fa; color: #333;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4F46E5;">📩 New Contact Us Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="margin: 20px 0;" />
        <p style="white-space: pre-line;"><strong>Message:</strong><br />${message}</p>
        <hr style="margin: 30px 0;" />
        <footer style="font-size: 12px; color: #888;">
          You received this email because someone submitted the contact form on your site.
        </footer>
      </div>
    </div>
  `;
};
