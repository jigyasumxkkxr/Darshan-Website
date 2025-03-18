import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useResendOTP, useVerifyResetPassOTP, useVerifySignupOTP } from '@/hooks/user.hook';
import { setAuth, setToken } from '@/store/authSlice';

export default function VerifyOTP({ isVerifyOTP, setAction, OTPVerificationType, setOpen }) {

    const [otp, setOtp] = React.useState();
    const {user} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    

    const {loading:sLoading, callApi:VerifySignupOTP} = useVerifySignupOTP();
    const {loading:rLoading, callApi:VerifyResetPassOTP} = useVerifyResetPassOTP();
    const {callApi:ResendOTP} = useResendOTP();

    const handleOTPVerification = async(e) => {
        e.preventDefault();
        if(!otp) {
            alert('Please enter OTP and Email');
            return;
        }

        if(OTPVerificationType === 'signup') {
            const data = await VerifySignupOTP({otp, email: user.email});
            if(data) {
                dispatch(setAuth(data.user));
                dispatch(setToken(data.token));
                setOpen(false);
            }
            
        }

        if(OTPVerificationType === 'resetPass') {
            const data = await VerifyResetPassOTP({otp, email: user.email});
            if(data) {
                setAction('resetPassword');
            }
        }
    }

    const resedOTPHandler = async() => {
        const data = await ResendOTP({email: user.email});
        if(data) {
            alert(data.message);
        }
    }

    return (
        <div className={`w-full m-2 md:m-0 md:w-1/2 p-6 ${isVerifyOTP ? 'block' : 'hidden'}`}>
            <FaLongArrowAltLeft className='cursor-pointer' size={20} onClick={()=>setAction(OTPVerificationType === 'signup' ? 'signup' : 'resetPassInit')} />
            <h1 className='text-xl font-semibold text-center mb-4'>Verify OTP</h1>
            <p className='text-xs text-gray-700 mb-4'>Enter the OTP sent to your email address. If you have not received the OTP, click on the resend button.</p>
            <form onSubmit={handleOTPVerification}>
                <Input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mb-2"
                />
                <p className='flex justify-end mb-4'><span className='text-xs text-blue-500 font-semibold cursor-pointer' onClick={resedOTPHandler}>Resend OTP</span></p>
                <Button
                    className={`w-full text-white font-bold text-lg ${otp ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'}`}
                    type="submit"
                >
                    {(sLoading || rLoading) ? 'Verifying...' : 'Continue'}
                </Button>
            </form>
        </div>
    )
}
