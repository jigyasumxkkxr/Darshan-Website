import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSendResetPassOTP } from '@/hooks/user.hook';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/authSlice';

export default function ResetPassInitialtion({ isResetPassInit, setAction, setOTPVerificationType }) {

    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch();

    const { loading, callApi: SendResetOTP } = useSendResetPassOTP();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await SendResetOTP({email});
        if (res) {
            dispatch(setAuth(res.user))
            setAction('verifyOTP');
            setOTPVerificationType('resetPass');
        }
    }

    return (
        <div className={`w-full md:w-1/2 p-6 ${isResetPassInit ? 'block' : 'hidden'}`}>
            <FaLongArrowAltLeft className='cursor-pointer' size={20} onClick={() => setAction('login')} />
            <h1 className='text-xl font-semibold text-center mb-4'>Forgot Password?</h1>
            <p className='text-xs text-gray-700 mb-4'>No Problem! Enter your email below and we will send you an verification otp to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mb-4'
                />
                <Button
                    className={`w-full text-white font-bold text-lg ${(email) ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'}`}
                    onClick={handleSubmit}
                    type="submit"
                >
                    {loading ? 'Sending...' : 'Continue'}
                </Button>
            </form>
        </div>
    )
}
