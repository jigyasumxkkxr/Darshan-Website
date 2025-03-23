import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const SignupAdmin = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

    console.log(data);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Admin Signup</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input {...register("name", { required: "Name is required" })} placeholder="Enter your name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

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

            <div>
              <Label>Mobile</Label>
              <Input {...register("mobile", { required: "Mobile number is required" })} placeholder="Enter mobile number" />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
            </div>

            <div>
              <Label>Admin Secret Key</Label>
              <Input type="password" {...register("secretKey", { required: "Admin secret key is required" })} placeholder="Enter secret key" />
              {errors.secretKey && <p className="text-red-500 text-sm">{errors.secretKey.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Signup as Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupAdmin;
