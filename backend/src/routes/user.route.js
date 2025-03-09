import express from 'express';
import { login, logout, register, resendOTP, resetPassword, sendResetPasswordOTP, verifyRegistrationOtp, verifyResetPasswordOTP } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/verify-reg-otp').post(verifyRegistrationOtp);
router.route('/resend-otp').post(resendOTP);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/send-reset-otp').post(sendResetPasswordOTP);
router.route('/verify-reset-otp').post(verifyResetPasswordOTP);
router.route('/reset-password').post(resetPassword);

export default router;
