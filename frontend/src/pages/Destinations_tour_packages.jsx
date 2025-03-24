import Footer from '@/components/Footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { FaHandHoldingUsd } from 'react-icons/fa'
import PackageCard from '@/components/PackageCard'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EnquiryForm from '@/components/EnquiryForm'

export default function Destinations_tour_packages() {

  const [open, setOpen] = useState(false);
  const {tourPackages} = useSelector(state=>state.tourPackages);
  const {packName} = useParams();
  const tour_packages = tourPackages.filter((item)=> item.Heading === packName.toString())[0];
  

  return (
    <div className='w-full '>
      <Header />
      <div className="bg-[url(https://www.easemytrip.com/holidays/img/bnnr_hol.jpeg)] md:bg-[url('/images/listbnner.webp')] bg-cover bg-center bg-gray-600 bg-blend-overlay w-full h-[240px] flex flex-col justify-center items-center">
        {/* Title */}
        <h1 className=" text-lg md:text-4xl text-white font-bold">
          Explor {tour_packages?.Heading} Divine Destination
        </h1>

        {/* Search Box */}
        <div className="w-full max-w-[80vw] md:max-w-xl mt-6 relative">
          <div className="flex bg-white rounded-full overflow-hidden">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder={tour_packages?.Heading}
                value={tour_packages?.Heading}
                className="pl-12 h-10 md:h-14 w-full text-black rounded-l-full border-none focus:ring-0"
              />
            </div>
            <Button className="h-10 md:h-14 px-6 md:px-12 bg-[#125296] hover:bg-[#125296] text-white rounded-l-full rounded-r-full">
              Search
            </Button>
          </div>
        </div>
      </div>
      <div>

      </div>
      <div className='px-2 md:px-16 py-3 lg:px-32'>
        <h1 className='text-2xl font-bold mb-4'>{tour_packages?.Heading} Tour Packages</h1>
        <p className='text-sm font-serif'>{tour_packages?.Description}</p>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-4 '>
          {
            tour_packages?.Destinations.map((destination, index) => {
              return (
                <PackageCard destination={destination} />
              )
            })
          }
        </div>
        <div className=''>
          {
            tour_packages?.Details.map((detail, index) => {
              return (
                <div key={index} className='mt-4'>
                  <h3 className='text-xl font-bold'>{detail.heading}</h3>
                  <p className='text-sm'>{detail.description}</p>
                </div>
              )
            })
          }
        </div>
        <div className='py-4'>
          <h3 className='text-xl font-bold'>Frequently Asked Questions(FAQ)</h3>
          {
            tour_packages?.FAQ.map((faq, index) => {

              const [isOpen, setIsOpen] = useState(false);

              return (
                <div className="py-4 border-b">
                  {/* Question Section */}
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <span className="text-sm md:text-xl font-semibold">Q. {faq.Question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IoIosArrowDown size={25} />
                    </motion.div>
                  </div>

                  {/* Answer Section with Smooth Transition */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm mt-2">Ans: {faq.Answer}</p>
                  </motion.div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="bg-blue-100 text-black p-6 rounded-lg text-center max-w-5xl mx-auto my-6">
        <span className="font-bold text-xl">Email ID:</span> <span className='text-lg'>easydarshan@easemytrip.com</span> |
        <span className="font-bold text-lg"> Contact No:</span> 011 35359999
      </div>
      <div className='fixed right-0 top-[45vh]' onClick={()=>setOpen(true)}>
        <div className='flex flex-col items-center justify-center px-1 py-2 md:p-4 rounded-tl-lg rounded-bl-lg cursor-pointer bg-[#d4ebf0] shadow-lg'>
          <img src="	https://www.easydarshan.com/Content/customize/img/phone-call.svg" className='size-6 sm:size-8 md:size-10 lg:size-12' alt="" />
          <span className='text-md'>Enquiry</span>
          <span className='text-md'>Now</span>
        </div>
      </div>
      <EnquiryForm open={open} setOpen={setOpen} />
      <Footer />
    </div>
  )
}
