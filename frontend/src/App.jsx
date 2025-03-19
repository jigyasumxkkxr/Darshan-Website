import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import TourPackage from './components/TourPackage';
import Destinations_tour_packages from './pages/Destinations_tour_packages';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}
