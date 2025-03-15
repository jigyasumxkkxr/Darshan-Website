import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Login from './Login';
import Signup from './Signup';
import ResetPassInitialtion from './ResetPassInitialtion';
import VerifyOTP from './VerifyOTP';
import ResetPassword from './ResetPassword';

export default function UserAuthentication({action, setAction, open, setOpen }) {

    const [OTPVerificationType, setOTPVerificationType] = useState('');

    const images = [
        {
          src: "https://www.easemytrip.com/images/nwhomfiles/emtcash.svg",
          title: "Sign up & Earn",
          subtitle: "Sign Up And Get An Exciting Deals.",
        },
        {
          src: "https://www.easemytrip.com/images/nwhomfiles/amzdeal.svg",
          title: "Exclusive Discounts",
          subtitle: "Get the best travel discounts by signing up.",
        },
        {
          src: "https://www.easemytrip.com/images/nwhomfiles/freebooking.svg",
          title: "Plan Your Trip",
          subtitle: "Find amazing deals on your next destination.",
        },
      ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl min-h-[45vh] flex flex-col md:flex-row p-0 overflow-hidden" onInteractOutside={(e) => e.preventDefault()}>
                {/* Left Side - Swiper Image Slider */}
                <div className="hidden md:block w-1/2 bg-gradient-to-b from-blue-500 via-white to-orange-200 p-10 ">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        className="h-full"
                    >
                        {images.map((item, index) => (
                            <SwiperSlide key={index} className="flex flex-col items-center justify-center text-center p-6">
                                <img src={item.src} alt={item.title} className="object-cover ml-16 rounded-md mb-4" />
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <p className="text-sm text-gray-500">{item.subtitle}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Login*/}
                <Login isLogin={action === 'login'} setAction={setAction} setOpen={setOpen} />                
                
                {/* Signup*/}
                <Signup isSignup={action === 'signup'} setAction={setAction} setOTPVerificationType={setOTPVerificationType} />
                
                {/*Reset Password Initiation*/}
                <ResetPassInitialtion isResetPassInit={action === 'resetPassInit'} setAction={setAction} setOTPVerificationType={setOTPVerificationType} />
                
                {/* Verify OTP */}
                <VerifyOTP isVerifyOTP={action === 'verifyOTP'} setAction={setAction} OTPVerificationType={OTPVerificationType} setOpen={setOpen} />

                {/* Reset Password  */}
                <ResetPassword isResetPassword={action === 'resetPassword'} setAction={setAction} />
                
            </DialogContent>
        </Dialog>
    )
}
