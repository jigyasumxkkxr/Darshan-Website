import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartPie, FaPlaneDeparture, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/user.hook";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setToken } from "@/store/authSlice";
import { useGetAllDestination } from "@/hooks/destination.hook";
import { useGetAllEnquiry } from "@/hooks/enquiry.hook";



const AdminDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enquiries, setEnquiries] = useState([]);
  const [destinations, setDestination] = useState([]);

  const { callApi: Logout } = useLogout();
  const { callApi: GetAllDestinations } = useGetAllDestination();
  const { callApi: GetAllEnquiry } = useGetAllEnquiry();


  const handleLogout = async () => {
    const res = await Logout();
    if (res) {
      console.log(res.message);
      dispatch(setAuth(null));
      dispatch(setToken(null));
      navigate('/admin/login');
    }
  };

  useEffect(() => {
    const fetchAllDestinations = async () => {
      const res = await GetAllDestinations();
      if (res) {
        setDestination(res.destinations);
      }
    }
    fetchAllDestinations();

    const fetchAllEnquiry = async () => {
      const res = await GetAllEnquiry();
      if (res) {
        setEnquiries(res.enquiries);
      }
    }
    fetchAllEnquiry();
  }, [])

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => navigate('/admin')}>Dashboard</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => navigate('/admin/manage-tour')}>Manage Tours</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => navigate('/admin/manage-tours-packages')}>Manage Tours Packages</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer" onClick={() => navigate('/admin/enquiry')}>Enquiry</li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="bg-red-500 w-full py-2 rounded mt-4" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center space-x-4 shadow-lg">
            <div className="bg-blue-700 p-4 rounded-lg"><FaPlaneDeparture className="text-white text-3xl" /></div>
            <div>
              <h3 className="text-xl">Total Tours</h3>
              <p className="text-2xl font-bold">{destinations?.length}</p>
            </div>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center space-x-4 shadow-lg">
            <div className="bg-blue-700 p-4 rounded-lg"><FaChartPie className="text-white text-3xl" /></div>
            <div>
              <h3 className="text-xl">Total Bookings</h3>
              <p className="text-2xl font-bold">{enquiries?.length}</p>
            </div>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white p-6 mt-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Tour Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={destinations}>
              <XAxis dataKey="packageName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
