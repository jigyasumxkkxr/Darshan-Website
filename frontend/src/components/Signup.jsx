import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/user.hook";
import { setAuth } from "@/store/authSlice";
import { useDispatch } from "react-redux";

export default function Signup({ isSignup, setAction, setOTPVerificationType }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false); // To track location fetching state
  const dispatch = useDispatch();

  const {loading, callApi:Signup} = useSignup();

  // Fetch user location
  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Convert lat/long to a readable address using OpenStreetMap API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const locationName = data.display_name || "Location not found";

          setUserData((prev) => ({ ...prev, location: locationName }));
        } catch (err) {
          setError("Failed to fetch location.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setError("Unable to retrieve location.");
        setLocating(false);
      }
    );
  };

  // Handle form submission
  const signupHandler = async(e) => {
    e.preventDefault();
    setError("");

    if (!userData.name || !userData.email || !userData.mobile || !userData.password || !userData.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    //API call
    const data = await Signup(userData);
    if(data) {
        dispatch(setAuth(data.user));
        setOTPVerificationType('signup');
        setAction('verifyOTP');
    }
    
  };

  return (
    <div className={`w-full md:w-1/2 p-6 ${isSignup ? "block" : "hidden"}`}>
      <h2 className="text-xl font-semibold text-center mb-4">Signup</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={signupHandler}>
        <Input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="mb-4"
          required
        />
        <Input
          type="email"
          placeholder="Email ID"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="mb-4"
          required
        />
        <Input
          type="text"
          placeholder="Mobile"
          value={userData.mobile}
          onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
          className="mb-4"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="mb-4"
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
          className="mb-4"
          required
        />

        {/* Location Input with Auto-Fetch Button */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter Location"
            value={userData.location}
            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
            className="mb-4 flex-1"
          />
          <Button type="submit" className="mb-4 bg-blue-500 text-white" onClick={handleFetchLocation} disabled={locating}>
            {locating ? "Fetching..." : "Use My Location"}
          </Button>
        </div>

        <Button
          className={`w-full text-white font-bold text-lg ${
            userData.email && userData.password && userData.mobile && userData.confirmPassword
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </Button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-2">
        By signup, I understand & agree to EaseMyTrip
      </p>

      <p className="text-xs w-full flex justify-center mt-2">
        Already have an account? 
        <span className="text-blue-600 cursor-pointer ml-1" onClick={()=>setAction('login')}>
          Login
        </span>
      </p>
    </div>
  );
}
