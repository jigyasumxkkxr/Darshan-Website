import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useResendOTP, useVerifySignupOTP } from "@/hooks/user.hook";
import { useNavigate } from "react-router-dom";
import { setAuth, setToken } from "@/store/authSlice";

const AdminOTPVerification = () => {
    const [otp, setOtp] = useState("");
    const {user} = useSelector(state=>state.auth);
    const {loading, callApi: VerifyOTP} = useVerifySignupOTP();
    const {callApi: ResendOTP} = useResendOTP();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleVerify = async () => {
        const res = await VerifyOTP({email: user.email, otp});
        if(res) {
            console.log(res.message);
            dispatch(setAuth(res.user));
            dispatch(setToken(res.token));
            navigate('/admin');
        }
        
    };

    const handleResendOTP = async () => {
        const res = await ResendOTP({email: user.email});
        if(res) {
            alert(res.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-96 p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-center">Admin OTP Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="text" 
                        placeholder="Enter 6-digit OTP" 
                        value={otp} 
                        onChange={(e)=> setOtp(e.target.value)} 
                        className="text-center text-lg tracking-widest"
                    />
                    <Button className="w-full" onClick={handleVerify} disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <span onClick={handleResendOTP} className="flex justify-center cursor-pointer text-blue-500 font-semibold hover:text-blue-600 text-sm">Resend OTP</span>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOTPVerification;