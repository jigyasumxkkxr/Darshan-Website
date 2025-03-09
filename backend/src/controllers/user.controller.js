import { User } from "../models/user.model.js";
import { sendResetPasswordVerificationEmail } from "../services/sendResetPasswordVerificationEmail.js";
import { sendVerificationEmail } from "../services/sendVerificationEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const {name , email, password, mobile, location, admin_secret_key} = req.body;
        let user_role = 'user';

        if(!name || !email || !password || !mobile){
            return res.status(400).json({message: "Please fill all the required fields."});
        }
        if(password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists."});
        }

        if(admin_secret_key){
            if(admin_secret_key !== process.env.ADMIN_SECRET_KEY){
                return res.status(400).json({success:false, message: "Invalid admin secret key."});
            }
            else {
                user_role = 'admin';
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role:user_role,
            mobile,
            location,
            otp,
            otp_expiry: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        user.password = undefined;
        user.otp = undefined;

        //Send Verification email
        await sendVerificationEmail(email, otp, name);

        return res.status(201).json({success:true, message: "Verification otp sent successfully.", user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: 'Error registering user'});
    }
}


export const verifyRegistrationOtp = async(req, res)=> {
    try {
        const { email, otp } = req.body;
    
        if (!email || !otp) {
          return res.status(400).json({ success: false, message: "Email and OTP are required." });
        }
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
        }

        if(user.is_verified) {
          return res.status(400).json({ success: false, message: "User is already verified ." });
        }
    
        if (user.otp !== otp || Date.now() > user.otp_expiry) {
          return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }
    
        user.is_verified = true;
        user.otp = null;
        user.otp_expiry = null;
        await user.save();
    
        user.password = undefined;
    
        const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
    
        return res
          .status(200)
          .cookie("darshan_tour_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge:3 * 24 * 60 * 60 * 1000, // 3 day
          })
          .json({ success: true, message: "Email verified successfully.", user, token });
      } catch (error) {
        console.error("Error in verifying signup OTP:", error);
        return res.status(500).json({ success: false, message: "Error in verifying signup OTP" });
      }
}


export const resendOTP = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otp_expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
      await user.save();
  
      await sendVerificationEmail(email, otp, user.name);
  
      return res.status(200).json({ success: true, message: "OTP resent successfully." });
    } catch (error) {
      console.error("Error in resending OTP:", error);
      return res.status(500).json({ success: false, message: "Internal server error in resend OTP" });
    }
  };
  
  // Login Controller
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not exist. Please signup first." });
      }
  
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ success: false, message: "Invalid email or password." });
      }

      user.password = undefined;
  
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
  
      return res
        .status(200)
        .cookie("darshan_tour_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge:3 * 24 * 60 * 60 * 1000, // 3 day
        })
        .json({ success: true, message: "Logged in successfully.", user, token });
    } catch (error) {
      console.error("Error in login user:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error in login." });
    }
  };
  
  
  
  //Logout
  export const logout = async (req, res) => {
      try {
          
          res.clearCookie("darshan_tour_token", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict", 
          });
  
          return res.status(200).json({
              success: true,
              message: "Logged out successfully",
          });
      } catch (error) {
          console.error("Error logging out:", error);
          return res.status(500).json({
              success: false,
              message: "Internal Server Error in logout.",
          });
      }
  };
  
  
  
  // Send Reset Password OTP
  export const sendResetPasswordOTP = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      if (!user.is_verified) {
        return res.status(400).json({ success: false, message: "User is not verified. Please verify your email first." });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otp_expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
      await user.save();
  
      await sendResetPasswordVerificationEmail(email, otp, user.name);
  
      return res.status(200).json({ success: true, message: "Reset password OTP sent." });
    } catch (error) {
      console.error("Error in sending reset password OTP:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error in sending reset password OTP." });
    }
  };
  
  // Verify Reset Password OTP
  export const verifyResetPasswordOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      if (!user.is_verified) {
        return res.status(400).json({ success: false, message: "User is not verified. Please verify your email first." });
      }
  
      if (user.otp !== otp || Date.now() > user.otp_expiry) {
        return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
      }
  
      user.otp = 'ready_to_reset_password'; 
      user.otp_expiry = null; // Clear the expiration date
      await user.save();
  
      return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
      console.error("Error in verifying reset password OTP:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error in verifying reset password OTP." });
    }
  };
  
  // Reset Password
  export const resetPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and new password are required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      if (!user.is_verified) {
        return res.status(400).json({ success: false, message: "User is not verified. Please verify your email first." });
      }
  
      if(user.otp !== 'ready_to_reset_password'){
          return res.status(400).json({ success: false, message: "Password reset is not initiated yet." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.otp = null;
      await user.save();
  
      return res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      console.error("Error in resetting password:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  