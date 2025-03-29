import Footer from '@/components/Footer';
import Header from '@/components/header';
import React from 'react'

export default function DarshanKutumb() {

    return (
        <div>
            <Header />
            <div className="bg-white text-gray-900">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('https://www.easydarshan.com/Content/loyalty/img/loyalty_banner.png')" }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className='text-center'>
                        <h1 style={{ fontFamily: 'Brush Script MT' }} className="relative flex justify-center text-5xl text-white">Darshan Kutumb</h1>
                        <h1 style={{ fontFamily: 'losta' }} className="relative text-3xl sm:text-5xl font-bold text-white">A Loyalty Programme for Devotees</h1>
                    </div>
                </div>

                {/* Introduction Section */}
                <section className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 style={{ fontFamily: 'cursive' }} className="text-2xl sm:text-4xl font-bold">
                    Experience Divine Journeys with <span className="text-[#7bcce0]">Darshan Kutumb</span>
                    </h2>
                    <p className="mt-4 text-gray-700">
                    Embark on a spiritual journey with our specially curated travel packages. Whether you're planning a pilgrimage or a peaceful getaway, Darshan Kutumb ensures a seamless and enriching experience.
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold my-3 sm:my-8">Why Choose Darshan Kutumb</h3>
                    <p className="mt-4 text-gray-700">Darshan Kutumb brings you handpicked pilgrimage destinations across India, ensuring a spiritually fulfilling and memorable journey. We provide comfortable stays and guided tours, allowing you to focus on your devotion while we take care of all the arrangements. With our hassle-free booking and dedicated support, your travel experience remains smooth and worry-free from start to finish.</p>

                </section>



                {/* Mission Section */}
                <section className="bg-[#cfeef5] text-center py-12 mt-12">
                    <h2 style={{ fontFamily: 'losta' }} className="text-4xl font-bold">Our <span className="text-[#5dcce8]">Mission</span></h2>
                    <p className="max-w-3xl mx-auto mt-4 text-gray-700">
                        Our mission is to make the sacred experience accessible to everyone while preserving
                        the sanctity of pilgrimage. We ensure that your spiritual journey is smooth, comfortable, and meaningful.
                    </p>
                </section>

                {/* Offerings Section */}
                <section className="max-w-5xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-4xl font-bold">Why <span className="text-[#5dcce8]">Darshan Kutumb</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://www.easydarshan.com/Content/loyalty/img/booking.svg" alt="emt offer1" />
                            <h4 className="text font-semibold ft-600 mt-15">Earn Points on every booking</h4>
                            <p className="text mt-2"></p>
                            Now save more with EasyHolidayinn. You will earn loyalty points on each and every online and offline booking.
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://www.easydarshan.com/Content/loyalty/img/Reedem.svg" alt="emt offer2" />
                            <h4 className="text font-semibold ft-600 mt-15">Redeem Points to save more</h4>
                            <p className="text mt-2"></p>
                            Use Kutumb Points while making a booking on easyholidayinn.com and cut down your package price.
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://www.easydarshan.com/Content/loyalty/img/Namaste_hand.svg" alt="emt offer3" />
                            <h4 className="text font-semibold ft-600 mt-15">Pranam Services at the Airports</h4>
                            <p className="text mt-2"></p>
                            Complimentary Pranam Services (Basic Package) at the Airports (Approx INR 3000).
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://www.easydarshan.com/Content/loyalty/img/Night_Stay.svg" alt="emt offer4" />
                            <h4 className="text font-semibold ft-600 mt-15">Complimentary Night Stay</h4>
                            <p className="text mt-2"></p>
                            One Night Stay complimentary in 5 Star for a couples
                            <p></p>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <div className="text-center py-6 text-lg font-semibold bg-gray-100 mb-10">
        //Join us at EasyHolidayinn, where devotion meets convenience//
                </div>
            </div>
            <Footer />
        </div>
    );
}
