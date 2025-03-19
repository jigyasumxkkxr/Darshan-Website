import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-black  text-white py-4 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left">
          <p className="text-sm">Division of <span className="font-bold">EaseMyTrip</span></p>
          <p className="text-sm">Copyright &copy; EasyDarshan | All Rights Reserved.</p>
        </div>

        {/* Right Side - Logos */}
        <div className="flex flex-wrap justify-center md:justify-end mt-3 md:mt-0 space-x-3">
          <img src="https://easydarshan.com/images/new-img/botft.png" alt="Incredible India" className="h-6" />
          
        </div>
      </div>
    </footer>
  )
}
