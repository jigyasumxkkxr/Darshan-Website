import React, { useState } from 'react'
import Header from './header'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCalendarCheck, FaClock, FaDumbbell } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaHandHoldingUsd } from "react-icons/fa";
import { ImClock, ImLocation } from "react-icons/im";
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EnquiryForm from './EnquiryForm';
import EmiDialog from './EMIOptions';


export default function TourPackage() {

    const {destinations} = useSelector(state=>state.destination);
    const [open, setOpen] = useState(false);
    const [openEMI, setOpenEMI] = useState(false);
    const {id} = useParams();
    const {currency, conversionRate, currencySymbols} = useSelector(state=> state.currency);
    const destination = destinations.filter(des=> des._id === id)[0];

    return (
        <div className='w-full relative'>
            <Header />
            <div className='w-full lg:flex justify-center scrollbar-hidden'>
                <div className='mt-12 lg:max-w-[819px] '>
                    <h1 className='text-xl md:text-[30px] font-semibold inline'>{destination?.packageName}</h1>
                    <span className='font-bold ml-4 text-sm'>{destination?.noOfNights} Nights / {destination?.noOfDays} Days</span>
                    <p className='text-sm '>{destination?.stayCity}</p>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        className=""
                    >
                        {destination?.gallaryImg.map((item, index) => (
                            <SwiperSlide key={index} className="flex flex-col items-center justify-center text-center mt-2">
                                <img src={item.img} className="rounded-md w-full sm:w-[90vw] lg:w-full h-[60vh] lg:h-[380px] mb-4" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='sticky top-0 bg-white z-20'>
                        <nav className='flex lg:gap-6 gap-2 overflow-x-auto'>
                            <a className='px-4 focus:bg-[#125296] cursor-pointer py-2 rounded-full hover:bg-[#125296] text-gray-500 hover:text-white' href='#overview'>Overview</a>
                            <a className='px-4 focus:bg-[#125296] cursor-pointer py-2 rounded-full hover:bg-[#125296] text-gray-500 hover:text-white flex gap-1' href='#itinerary'><span>Day</span><span>Wise</span><span>Itenerary</span></a>
                            <a className='px-4 focus:bg-[#125296] cursor-pointer py-2 rounded-full hover:bg-[#125296] text-gray-500 hover:text-white' href='#inclusion/exclusion'>Inclusion/Exclusions</a>
                            <a className='px-4 focus:bg-[#125296] cursor-pointer py-2 rounded-full hover:bg-[#125296] text-gray-500 hover:text-white flex gap-1' href="#term_condition"><span>Additional</span><span>Info</span></a>
                        </nav>
                    </div>
                    <div id='overview'>
                        {
                            destination?.overview ?
                                <div className='py-4 mt-4 border border-gray-300 rounded-lg shadow-lg box-border w-full'>
                                    <h2 className='text-xl font-bold border-l-4 border-l-[#125296] pl-4'>Package Overview</h2>
                                    <p className='px-4 text-sm mt-4 font-serif'>{destination.overview}</p>
                                </div> : null
                        }
                    </div>
                    <div id='hotel'>
                        {
                            destination?.hotels.length !== 0 ?
                                <div className='py-4 mt-4 border border-gray-300 rounded-lg shadow-lg box-border w-full'>
                                    <h2 className='text-xl font-bold border-l-4 border-l-[#125296] pl-4'>Hotel Details</h2>
                                    {
                                        destination.hotels.map((hotel, index) => {
                                            return (
                                                <div key={index} className='flex flex-col gap-2 mt-4 ml-4'>
                                                    <div className="flex flex-col md:flex-row gap-2 p-2 border-b-2 border-dashed">
                                                        <img
                                                            src={hotel.hotelImg}
                                                            alt="Hotel image"
                                                            className="h-36 w-full md:w-44 object-cover rounded-md flex-shrink-0"
                                                        />

                                                        <div className="flex flex-col pr-2">
                                                            <h3 className="text-md text-gray-700 font-bold">{hotel.hotelName}</h3>
                                                            <p className="text-xs ">{hotel.hotelDescription}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : null
                        }
                    </div>
                    <div id='itinerary'>
                        {
                            destination?.tableItinerary?.Itinerarys?.length > 0 ?
                                <div className='py-4 mt-4 border border-gray-300 rounded-lg shadow-lg box-border w-full'>
                                    <h2 className='text-xl font-bold border-l-4 border-l-[#125296] pl-4'>Day Wise Itinerary</h2>
                                    <div className='p-6'>
                                        {
                                            destination?.tableItinerary.Itinerarys.map((item, index) => {
                                                return (
                                                    <div key={index} className="relative flex gap-4 pb-6">
                                                        {/* Timeline Line */}
                                                        <div className="absolute left-[83px] top-0 h-full w-[1px] bg-gray-300 hidden md:block"></div>

                                                        {/* Day Badge + Icon */}
                                                        <div className="relative hidden md:block">
                                                            <div className="py-1 px-3 text-xs font-semibold rounded-full bg-[#125296] text-white flex gap-2 ">
                                                                <p>Day</p>
                                                                <p>{item.Days}</p>
                                                            </div>

                                                        </div>

                                                        <FaCalendarCheck color='#125296' className='z-10 hidden md:block' size={20} />

                                                        <div className="w-full border border-[#95bce6] rounded-lg shadow-md bg-white overflow-hidden">
                                                            {/* Header */}
                                                            <h3 className="text-md font-semibold px-4 py-2 bg-[#b2cfef] text-black">
                                                                Day {item.Days} {item.Heading}
                                                            </h3>

                                                            {/* Itinerary List */}
                                                            <ul className="list-disc pl-8 pr-4 py-3 space-y-2">
                                                                {item.Itinerary.map((data, idx) => (
                                                                    <li key={idx} className="text-gray-700 font-serif text-sm">{data.Description}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div> : null
                        }
                    </div>
                    <div className='flex flex-col md:flex-row gap-4' id='inclusion/exclusion'>
                        {
                            destination?.inclusion.length !== 0 ?
                                <div className='border border-gray-300 shadow-lg md:w-1/2 mt-4 py-4 bg-[#d5f4df] rounded-lg'>
                                    <h2 className='text-xl px-6 font-bold border-l-4 border-[#5fba7f]'>Inclusions</h2>
                                    {
                                        destination.inclusion.map((item, index) => {
                                            return (
                                                <div key={index} className='px-6'>
                                                    <FaCheck className='inline' color='#5fba7f' size={10} />
                                                    <p className='text-sm font-serif inline ml-2'>{item.inclussion}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : null
                        }
                        {
                            destination?.exclusion.length !== 0 ?
                                <div className='border border-gray-300 shadow-lg md:w-1/2 mt-4 py-4 bg-[#f9e0d6] rounded-lg'>
                                    <h2 className='text-xl px-6 font-bold border-l-4 border-red-500'>Exclusions</h2>
                                    {
                                        destination.exclusion.map((item, index) => {
                                            return (
                                                <div key={index} className='px-6'>
                                                    <RxCross2 className='inline' color='red' size={10} />
                                                    <p className='text-sm font-serif inline ml-2'>{item.exclussion}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : null
                        }
                    </div>
                    <div id='term_condition'>
                        {
                            destination?.term_Condition.length !== 0 ?
                                <div className='py-4 mt-4 mb-4 border border-gray-300 rounded-lg shadow-lg box-border w-full'>
                                    <h2 className='text-xl font-bold border-l-4 border-l-[#125296] pl-4'>Term & Conditions</h2>
                                    <div className='p-6'>
                                        {
                                            destination.term_Condition.map((item, index) => {
                                                return (
                                                    <div key={index} className="relative flex gap-4 pb-6">

                                                        {/* Content Box */}


                                                        <div className="w-full border border-[#95bce6] rounded-lg shadow-md bg-white overflow-hidden">
                                                            {/* Header */}
                                                            <h3 className="text-md font-semibold px-4 py-2 bg-[#b2cfef] text-black">
                                                                {item.heading}
                                                            </h3>

                                                            <ul className='list-disc pl-8 font-serif text-sm py-2'>
                                                                {
                                                                    item.term_Condition && <li>{item.term_Condition}</li>
                                                                }
                                                                {
                                                                    item.list &&
                                                                    item.list.map((listItem, index) =>
                                                                        <li key={index}>{listItem}</li>
                                                                    )
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div> : null
                        }
                    </div>
                </div>

                {/* Enquiry Form */}
                <div className=''>
                    <div className='sticky top-10'>
                        <div className='m-6 border shadow-lg w-[350px] rounded-lg mt-28 hidden lg:block'>
                            <section className='bg-[#b2cfef] flex justify-between p-2 pb-6 rounded-tl-lg rounded-tr-lg'>
                                <div>
                                    <span className='block text-sm font-semibold text-gray-800'>Starting from</span>
                                    {
                                        destination?.CuttingPrice.IsActive && <span className='line-through text-gray-700 text-lg'>{currencySymbols[currency]}{Math.round(destination.CuttingPrice.Amount * conversionRate[currency])}</span>
                                    }
                                    <p className='flex items-center gap-2'> <span className=' text-3xl font-bold'>{currencySymbols[currency]}{Math.round(destination.twoPaxOccupancy * conversionRate[currency])}</span><span className='text-xs font-semibold'>Per Person</span></p>
                                </div>
                                <div>
                                    <p className='flex gap-2 text-gray-700'><FaHandHoldingUsd size={15} /><span className='text-xs font-semibold'> No Cost EMI</span></p>
                                    <span className='block text-sm text-gray-700 font-semibold'>Starts from {currencySymbols[currency]}{Math.round(destination.CuttingPrice.Amount * conversionRate[currency]/6)} </span>
                                    <span className='text-xs flex justify-end text-blue-600 font-semibold cursor-pointer' onClick={()=>setOpenEMI(true)}>See options</span>
                                </div>
                            </section>
                            <section className='p-2 relative'>
                                <span className='flex items-center gap-2'><ImClock color='red' /> <span className='text-sm font-semibold text-gray-800'> Duration: {destination.noOfNights} Nights & {destination.noOfDays} Days</span></span>
                                <div className='flex items-center gap-2'>
                                    <ImLocation color='brown' />
                                    <div className='text-gray-800 font-semibold flex gap-2'>Place to visit:</div>
                                </div>
                                <span className='text-sm'>{destination.stayCity}</span>
                                <span className='flex justify-center text-xs font-semibold my-4 border-b'>Package Includes</span>
                                <div className='flex gap-4'>
                                    {
                                        destination?.packageIncludes.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {
                                                        item.Name === 'Hotel' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/hotel-1.svg" alt="Hotel" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                                    }
                                                    {
                                                        item.Name === 'Sightseeing' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/sightseeing-1.svg" alt="Sightseeing" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                                    }
                                                    {
                                                        item.Name === 'Transfer' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/transfer-1.svg" alt="Transfer" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                                    }
                                                    {
                                                        item.Name === 'Meal' && <div className='flex flex-col gap-1 items-center'><img src="https://www.easemytrip.com/holidays/Content/customize/img/meal-1.svg" alt="Meal" /><p className='text-xs text-gray-700'>{item.Name}</p></div>
                                                    }

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className='w-full border border-[#125296] mr-2 py-3 text-sm rounded-full mt-6 mb-2 text-[#125296] hover:bg-blue-50 font-bold' onClick={() => {setOpen(true)} }>ENQUIRY NOW</button>
                            </section>
                        </div>
                        <div className="flex justify-center items-center gap-4 p-4 border rounded-lg shadow-sm bg-gray-100 w-full lg:w-fit lg:ml-6">
                            <div className="p-2 bg-white rounded-full border">
                                <img src="/images/customer_support.png" alt="Support" className="w-10 h-10" />
                            </div>
                            <div >
                                <h3 className="text-lg font-semibold">Need Help?</h3>
                                <p className="text-sm text-gray-700">Call us : <span className="font-medium">+91-9355078160</span></p>
                                <p className="text-sm text-gray-700">Mail us : <span className="font-medium">easydarshan@easemytrip.com</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-100 text-black p-6 rounded-lg text-center max-w-5xl mx-auto my-6">
                <span className="font-bold text-xl">Email ID:</span> <span className='text-lg'>easydarshan@easemytrip.com</span> |
                <span className="font-bold text-lg"> Contact No:</span> 011 35359999
            </div>
            <div className='fixed bottom-0 z-20 w-full md:hidden'>
                <div className='flex gap-2 justify-between bg-green-100 px-4 py-1'>
                    <p className='text-gray-700 flex gap-2'><FaHandHoldingUsd size={15} /><span className='text-xs font-bold'> No Cost EMI Starts from {currencySymbols[currency]}{Math.round(destination.CuttingPrice.Amount * conversionRate[currency]/6)}</span></p>
                    <span className='text-xs flex justify-end text-blue-600 font-semibold cursor-pointer' onClick={()=>{setOpenEMI(true)}}>See options</span>
                </div>
                <div className='flex justify-between items-center bg-gray-800 py-2 px-4'>
                    <div className=''>
                        <span className='block text-xl font-bold text-white'>{currencySymbols[currency]}{Math.round(destination.twoPaxOccupancy * conversionRate[currency])}</span>
                        <span className="text-white text-xs font-semibold">per person on twin sharing</span>
                    </div>
                    <button className='py-2 px-6 rounded-full bg-blue-500 text-white font-semibold' onClick={()=> setOpen(true)} >Enquiry Now</button>
                </div>
            </div>
            <EnquiryForm open={open} setOpen={setOpen} tour={destination} />
            <EmiDialog open={openEMI} setOpen={setOpenEMI} price={destination.CuttingPrice.Amount} />
            <Footer />
        </div>
    )
}
