import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { resetPasswordEmailTemplate } from './resetPasswordEmailTemplate.js';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL, 
    pass: process.env.AUTH_EMAIL_PASSWORD, 
  },
});

export const sendResetPasswordVerificationEmail = async (email, otp, name) => {
    try {
      const mailOptions = {
        from: process.env.AUTH_EMAIL, 
        to: email, 
        subject: 'Verify Your Email Address',
        html: resetPasswordEmailTemplate(otp, name), 
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };