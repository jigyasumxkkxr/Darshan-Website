import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartPie, FaPlaneDeparture, FaUser, FaCog } from "react-icons/fa";

const tourData = [
  { id: 1, name: "South India", duration: "6 Nights / 7 Days", bookings: 120 },
  { id: 2, name: "Chardham Heli Yatra", duration: "5 Nights / 6 Days", bookings: 98 },
  { id: 3, name: "DoDham Heli Yatra", duration: "3 Nights / 4 Days", bookings: 75 },
];

const dashboardStats = [
  { title: "Total Tours", count: 15, icon: <FaPlaneDeparture className="text-white text-3xl" /> },
  { title: "Bookings", count: 450, icon: <FaChartPie className="text-white text-3xl" /> },
  { title: "Users", count: 1200, icon: <FaUser className="text-white text-3xl" /> },
];

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Dashboard</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Manage Tours</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Bookings</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Users</li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="bg-red-500 w-full py-2 rounded mt-4">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="bg-blue-500 text-white p-6 rounded-lg flex items-center space-x-4 shadow-lg">
              <div className="bg-blue-700 p-4 rounded-lg">{stat.icon}</div>
              <div>
                <h3 className="text-xl">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Chart */}
        <div className="bg-white p-6 mt-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Tour Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tourData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tours Management Table */}
        <div className="bg-white p-6 mt-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Manage Tours</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Tour Name</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Bookings</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tourData.map((tour) => (
                <tr key={tour.id} className="border-b">
                  <td className="p-2">{tour.name}</td>
                  <td className="p-2">{tour.duration}</td>
                  <td className="p-2">{tour.bookings}</td>
                  <td className="p-2">
                    <button className="text-blue-500 mr-2">Edit</button>
                    <button className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
