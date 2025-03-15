import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import { useResetPassword } from '@/hooks/user.hook';

export default function ResetPassword({ isResetPassword, setAction }) {

    const [data, setData] = React.useState({});
    const {user} = useSelector(state=>state.auth);

    const {loading, callApi:ResetPassword} = useResetPassword();

    const resetPasswordHandler = async(e) => {
        e.preventDefault();
        if(!data.password || !data.confirmPassword) {
            alert("Please fill in both fields");
            return;
        };
        if(data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        };


        const res = await ResetPassword({email:user.email, password:data.password});
        if(res) {
            alert(res.message)
            setAction('login')
        }
        
    }

    return (
        <div className={`w-full m-2 md:m-0 md:w-1/2 p-6 ${isResetPassword ? 'block' : 'hidden'}`}>
            <h1 className='text-xl font-semibold text-center mb-4'>Reset Password</h1>
            <p className='text-xs text-gray-700 mb-4'>Set a new password for your account</p>
            <form onSubmit={resetPasswordHandler}>
                <Input
                    type="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className="mb-4"
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                    className="mb-4"
                    required
                />
                <Button
                    className={`w-full text-white font-bold text-lg ${(data.password && data.confirmPassword) ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed'}`}
                    type="submit"
                >
                    {loading?'Processing...':'Continue'}
                </Button>
            </form>
        </div>
    )
}
