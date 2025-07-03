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
