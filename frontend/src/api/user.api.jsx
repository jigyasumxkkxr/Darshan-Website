import baseURL from "./config";

const fetchAPI = async(url, method = 'GET', body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(`${baseURL}/api/user${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            credentials:'include'
        });

        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.message || 'Failed to fetch data');
        }

        if(data.success) {
            return data;
        }

    } catch (error) {
        alert(error.message)
    }
}



//User APIs
export const signup = (userData) => fetchAPI('/register', 'POST', userData);
export const login = (userData) => fetchAPI('/login', 'POST', userData);
export const verifySignupOTP = (data)=> fetchAPI('/verify-reg-otp', 'POST', data);
export const resendOTP = (data)=> fetchAPI('/resend-otp', 'POST', data);
export const logout = () => fetchAPI('/logout');
export const sendResetPassOTP = (data) => fetchAPI('/send-reset-otp', 'POST', data);
export const verifyResetPassOTP = (data) => fetchAPI('/verify-reset-otp', 'POST', data);
export const resetPassword = (data) => fetchAPI('/reset-password', 'POST', data);