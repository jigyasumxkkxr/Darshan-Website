import Footer from "@/components/Footer";
import Header from "@/components/header";
import React from "react";

const AboutUs = () => {

    const images = [
        'https://media.easemytrip.com/media/Deal/DL638608902538100047/SightSeeing/SightSeeing0zD1al.jpg',
        'https://media.easemytrip.com/media/Deal/DL638284914247859300/Religious/ReligiouscW3KJ9.jpg',
        'https://media.easemytrip.com/media/Deal/DL638621879732375756/Religious/Religiousjiql7h.jpg',
        'https://media.easemytrip.com/media/Deal/DL638608969484118722/SightSeeing/SightSeeingLs15Gk.jpg'
    ]

    return (
        <div>
            <Header />
            <div className="bg-white text-gray-900">
                {/* Hero Section */}
                <div className="relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: "url('https://www.easydarshan.com/Content/home-page/img/banner-img.jpg')" }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div>
                        <h1 style={{ fontFamily: 'Brush Script MT' }} className="relative flex justify-center text-5xl text-white">About Us</h1>
                        <h1 style={{ fontFamily: 'losta' }} className="relative text-3xl sm:text-5xl font-bold text-white">Discover Who We Are</h1>
                    </div>
                </div>

                {/* Introduction Section */}
                <section className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 style={{ fontFamily: 'cursive' }} className="text-2xl sm:text-4xl font-bold">
                        Start Journey to Enlightenment With <span className="text-[#7bcce0]">Best-Selling Packages</span>
                    </h2>
                    <p className="mt-4 text-gray-700">
                        At EasyDarshan, we are dedicated to making your spiritual journey as seamless and fulfilling as possible. Founded with the vision to simplify the pilgrimage experience for devotees, we focus on providing hassle-free access to some of the most revered temples and sacred sites across India. Whether it's ensuring priority darshan, comfortable travel, or personalized rituals, we are here to handle all the details, so you can focus on your spiritual connection.
                    </p>
                    <p className="mt-4 text-gray-700">
                        With deep respect for Indian traditions and values, EasyDarshan offers tailored pilgrimage packages designed to meet the needs of modern-day travelers seeking a divine experience. Our expert team takes care of all the logistics — from fast-track temple entries to comfortable accommodations and special pooja arrangements. We also provide dedicated assistance at every step of the journey, ensuring your trip is both peaceful and spiritually enriching.
                    </p>
                </section>

                {/* Images Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
                    {images.map((item) => (
                        <img key={item} src={item}
                            className="w-full h-60 object-cover object-center rounded-tl-xl rounded-tr-xl shadow-md"
                            alt="Temple" />
                    ))}
                </div>

                <img src="https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/mamallapuram-shore-temple-1653384258_d88d3d01bc1bbf48db9b.webp" alt=""
                    className="w-[96vw] mx-auto h-60 object-cover object-center rounded-tl-xl rounded-tr-xl my-8"
                />

                {/* Mission Section */}
                <section className="bg-[#cfeef5] text-center py-12 mt-12">
                    <h2 style={{ fontFamily: 'losta' }} className="text-4xl font-bold">Our <span className="text-[#5dcce8]">Mission</span></h2>
                    <p className="max-w-3xl mx-auto mt-4 text-gray-700">
                    Our mission is to make the sacred experience accessible to everyone, offering the convenience of modern travel while preserving the sanctity of pilgrimage. Whether it’s your first yatra or a return to a beloved temple, EasyDarshan ensures that your path to divine blessings is smooth, comfortable, and meaningful.
                    </p>
                </section>

                {/* Offerings Section */}
                <section className="max-w-5xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-4xl font-bold">What <span className="text-[#5dcce8]">We Offer</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/resnble.svg" alt="emt offer1" />
                            <h4 className="text font-semibold ft-600 mt-15">Reasonable Prices</h4>
                            <p className="text mt-2"></p>
                            Get Unique Darshan packages at cost-effective prices like never before.
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/instant.svg" alt="emt offer2" />
                            <h4 className="text font-semibold ft-600 mt-15">Instant Bookings</h4>
                            <p className="text mt-2"></p>
                            Enjoy Fast-paced booking on your desired destination with ease.
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/guide.svg" alt="emt offer3" />
                            <h4 className="text font-semibold ft-600 mt-15">Guided tours</h4>
                            <p className="text mt-2"></p>
                            Have personalised travelling experience with additional guide assistance.
                            <p></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/suprt.svg" alt="emt offer4" />
                            <h4 className="text font-semibold ft-600 mt-15">24/7 Customer Support</h4>
                            <p className="text mt-2"></p>
                            GConnect with our experts and get 24/7 continuous guidance on your tour package.
                            <p></p>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <div className="text-center py-6 text-lg font-semibold bg-gray-100 mb-10">
        //Join us at EasyDarshan, where devotion meets convenience//
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
