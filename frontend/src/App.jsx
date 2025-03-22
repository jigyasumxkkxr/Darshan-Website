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
    element:<AdminDashboard />
  },
  {
    path: '/admin/manage-tour',
    element: <ManageTours />
  },
  {
    path: '/admin/manage-tour/add',
    element: <AddDestinationTour />
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

