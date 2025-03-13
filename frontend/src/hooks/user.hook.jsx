import { login, logout, resendOTP, resetPassword, sendResetPassOTP, signup, verifyResetPassOTP, verifySignupOTP } from "@/api/user.api";
import { useState } from "react";

const useApiCall = (apiFunction) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const callApi = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return {data, error, loading, callApi};
};


//User hooks

export const useSignup = () => useApiCall(signup);
export const useVerifySignupOTP = () => useApiCall(verifySignupOTP);
export const useResendOTP = () => useApiCall(resendOTP);
export const useLogin = () => useApiCall(login);
export const useLogout = () => useApiCall(logout);
export const useSendResetPassOTP = () => useApiCall(sendResetPassOTP);
export const useVerifyResetPassOTP = () => useApiCall(verifyResetPassOTP);
export const useResetPassword = () => useApiCall(resetPassword);