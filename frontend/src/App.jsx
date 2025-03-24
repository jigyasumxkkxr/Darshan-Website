import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import TourPackage from './components/TourPackage';
import Destinations_tour_packages from './pages/Destinations_tour_packages';
import AboutUs from './pages/AboutUs';
import DarshanKutumb from './pages/DarshanKutumb';
import AdminDashboard from './pages/admin/Dashboard';
import ManageTours from './pages/admin/ManageTours';
import AddDestinationTour from './components/admin/AddTour';
import UpdateDestinationTour from './components/admin/UpdateTour';
import ManageToursPackages from './pages/admin/ManageToursPackages';
import AddPackage from './components/admin/AddToursPackage';
import EnquiriesPage from './pages/admin/ManageEnquiry';
import EnquiryForm from './components/EnquiryForm';
import SignupAdmin from './pages/admin/AdminSignup';
import LoginAdmin from './pages/admin/AdminLogin';
import AdminOTPVerification from './pages/admin/OTPVerification';
import AdminPotectedRoute from './components/admin/AdminProtectedRoute';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path:'/darshan-kutumb',
    element: <DarshanKutumb />
  },
  {
    path:'/tour-packages/:packName',
    element: <Destinations_tour_packages />
  },
  {
    path:'/destination-tour/:id',
    element: <TourPackage />
  },
  {
    path:'/admin',
    element:<AdminPotectedRoute><AdminDashboard /></AdminPotectedRoute>
  },
  {
    path: '/admin/manage-tour',
    element: <AdminPotectedRoute><ManageTours /></AdminPotectedRoute>
  },
  {
    path: '/admin/manage-tour/add',
    element: <AdminPotectedRoute><AddDestinationTour /></AdminPotectedRoute>
  },
  {
    path: '/admin/manage-tour/update/:id',
    element: <AdminPotectedRoute><UpdateDestinationTour /></AdminPotectedRoute>
  },
  {
    path: '/admin/manage-tours-packages',
    element: <AdminPotectedRoute><ManageToursPackages /></AdminPotectedRoute>
  },
  {
    path: '/admin/manage-tours-packages/add',
    element: <AdminPotectedRoute><AddPackage /></AdminPotectedRoute>
  },
  {
    path: '/admin/enquiry',
    element: <AdminPotectedRoute><EnquiriesPage /></AdminPotectedRoute>
  },
  {
    path: '/admin/signup',
    element: <SignupAdmin />
  },
  {
    path:'/admin/login',
    element: <LoginAdmin />
  },
  {
    path: '/admin/verify-otp',
    element: <AdminOTPVerification />
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

