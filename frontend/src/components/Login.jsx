import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendToBackIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLogin } from '@/hooks/user.hook';
import { setAuth, setToken } from '@/store/authSlice';

export default function Login({ isLogin, setOpen, setAction }) {

    const [userData, setUserData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const {loading, callApi:Login} = useLogin();

    const loginHandler = async (e) => {
        e.preventDefault();
        if(!userData.email || !userData.password) {
            alert('Please fill in all fields');
            return;
        }

        const response = await Login(userData);
        if(response) {
            dispatch(setAuth(response.user));
            dispatch(setToken(response.token));
            setOpen(false);
        }
    }


    return (
        <div className={`w-full md:w-1/2 p-6 ${isLogin ? 'block' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-center mb-4">Login </h2>
            <form onSubmit={loginHandler}>
                <Input
                    type="email"
                    placeholder="Email ID"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="mb-4"
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className="mb-2"
                    required
                />
                <p className='flex justify-end mb-4'><span className='text-xs cursor-pointer text-blue-500  font-semibold' onClick={()=>setAction('resetPassInit')}>Forgot/Reset Password</span></p>
                <Button 
                    className={`w-full text-white font-bold text-lg ${(userData.email && userData.password) ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'}`} 
                    type="submit"
                >
                    {loading?'Processing...':'Continue'}
                </Button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-2">
                By logging in, I understand & agree to EaseMyTrip
            </p>
            <p className="text-xs w-full flex justify-center mt-2">
                Don't have an account?
                <span className="text-blue-600 cursor-pointer ml-1" onClick={() => setAction('signup')}>
                    Signup
                </span>
            </p>
        </div>
    )
}
