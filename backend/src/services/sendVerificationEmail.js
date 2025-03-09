import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL, 
    pass: process.env.AUTH_EMAIL_PASSWORD, 
  },
});

export const sendVerificationEmail = async (email, otp, name) => {
    try {
      const mailOptions = {
        from: process.env.AUTH_EMAIL, 
        to: email, 
        subject: 'Verify Your Email Address',
        html: emailTemplate(otp, name), 
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };