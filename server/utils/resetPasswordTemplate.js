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
