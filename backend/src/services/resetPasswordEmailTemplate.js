const resetPasswordEmailTemplate = (otp, name) => {
    return `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 10px; background: #f4f4f4; color: #333; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        
        <div style="background: #dc3545; padding: 15px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 22px;">🔒 Reset Your Password</h2>
        </div>
  
        <div style="padding: 20px;">
          <p style="font-size: 18px; margin-bottom: 10px;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            You recently requested to reset your password. Use the OTP below to proceed. 
            This code is valid for <strong>10 minutes</strong>.
          </p>
  
          <div style="display: inline-block; margin: 20px 0; padding: 15px 25px; font-size: 24px; font-weight: bold; color: #fff; background: #dc3545; border-radius: 5px; letter-spacing: 2px;">
            ${otp}
          </div>
  
          <p style="font-size: 14px; color: #777;">
            If you didn't request this, please ignore this email or contact support immediately.
          </p>
  
          <div style="margin-top: 20px;">
            <a href="#" style="display: inline-block; padding: 12px 20px; font-size: 16px; font-weight: bold; color: #fff; background: #dc3545; border-radius: 5px; text-decoration: none;">
              Reset Password
            </a>
          </div>
        </div>
  
        <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 15px;">
          © ${new Date().getFullYear()} <strong>Your Company Name</strong>. All Rights Reserved.
        </div>
      </div>
    `;
  };
  
  export default resetPasswordEmailTemplate;
  