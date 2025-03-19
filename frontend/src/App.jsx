import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import TourPackage from './components/TourPackage';
import Destinations_tour_packages from './pages/Destinations_tour_packages';
import AboutUs from './pages/AboutUs';
import DarshanKutumb from './pages/DarshanKutumb';

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
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}
