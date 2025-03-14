import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}
