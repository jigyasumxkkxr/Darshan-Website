import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/user.hook";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "@/store/authSlice";
import { isTokenExpired } from "@/lib/isTokenExpired";

const LoginAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {loading, callApi:AdminLogin} = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector(state=> state.auth);

  const onSubmit = async (data) => {
        const res = await AdminLogin(data);
        if(res) {
          console.log(res.message);
          dispatch(setAuth(res.user));
          dispatch(setToken(res.token));
          navigate('/admin');
        }
  };

  useEffect(()=>{
    if(token && !isTokenExpired(token)) {
      navigate('/admin');
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Admin Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email", { required: "Email is required" })} placeholder="Enter your email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" {...register("password", { required: "Password is required" })} placeholder="Enter password" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <span className="flex justify-center">Don't have an account? <Link to="/admin/signup" className="text-blue-500 cursor-pointer">Signup</Link></span>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginAdmin;
