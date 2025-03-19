import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Image, MessageSquare, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplays from "embla-carousel-autoplay"
import { tour_packages1, tour_packages2, tour_packages3, tour_packages4, tour_packages5, tour_packages6 } from "./tourPackages"
import { destinations } from "./destinations"


export default function Home() {

  const images = [
    {
      src: 'https://www.easydarshan.com/img/banner2.webp?v1'
    },
    {
      src: 'https://www.easydarshan.com/img/banner1.webp?v1'
    },
    {
      src: 'https://www.easydarshan.com/images/new-img/banner3-21.webp'
    }
  ];


  return (
    <div className="min-h-screen flex flex-col font-poppins overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-72">
        <div className="absolute inset-0 z-0">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            modules={[Autoplay, Pagination]}
            className="h-full"
          >
            {images.map((item, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center justify-center text-center">
                <img src={item.src} alt='banner-image' className="object-cover h-72 mb-4 w-full brightness-50" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 style={{ fontFamily: 'Brush Script MT' }} className="text-4xl font-light md:text-6xl mb-2">Start Your Spiritual Trails</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">In The Most Divine Destinations</h2>

          <div className="w-full max-w-[80vw] md:max-w-xl mt-6 relative">
            <div className="flex bg-white rounded-full overflow-hidden">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder='Search Your Dream Pilgrimage!'
                  className="pl-12 h-10 md:h-14 w-full text-black rounded-l-full border-none focus:ring-0"
                />
              </div>
              <Button className="h-10 md:h-14 px-6 md:px-12 bg-[#125296] hover:bg-[#125296] text-white rounded-l-full rounded-r-full">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 bg-white">
        <div className="">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold mb-2">
              Explore <span style={{ fontFamily: 'Brush Script MT' }} className="text-blue-600 font-script">Top Pilgrimage</span> Sites of India
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Discover the spiritual heart of India by exploring its top pilgrimage sites like never before
            </p>
          </div>

          {/* Crousel  */}

          <Carousel className="w-[80vw] mx-auto" plugins={[
            Autoplays({
              delay: 2000,
            }),
          ]}>
            <CarouselContent className="-ml-1">
              {[tour_packages1, tour_packages2, tour_packages3, tour_packages4, tour_packages5, tour_packages6].map((tour_package, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
                  <div className="p-3">
                    <img src={tour_package.Destinations[0].packageImgUrl} alt="" className="rounded-xl h-56 w-96 " />
                    <h2 className="text-lg font-semibold flex justify-center">{tour_package.Destinations[0].packageName}</h2>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Plan Trip Button */}
          <div className="fixed bottom-8 right-8 z-20">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
              <MessageSquare className="h-5 w-5" />
              Plan Your Trip
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12 px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">
          Start Journey to Enlightenment With <span className="text-blue-500 italic">Most Sought Tours</span>
        </h2>
        <p className="text-gray-700 mb-8">
          Embark on an unparalleled odyssey of spirituality with our specially-curated tour packages
        </p>
        <div className="grid grid-cols-6 grid-rows-2 h-[50vh] w-[70vw] gap-6">
          <img src={destinations[0].packageImgUrl} className="rounded-xl brightness-75 col-span-2 w-full h-full" alt="" />
          <img src={destinations[0].packageImgUrl} className="rounded-xl brightness-75 col-span-2 row-span-2 w-full h-full" alt="" />
          <img src={destinations[0].packageImgUrl} className="rounded-xl brightness-75 col-span-2 w-full h-full" alt="" />
          <img src={destinations[0].packageImgUrl} className="rounded-xl brightness-75 col-span-2 w-full h-full" alt="" />
          <img src={destinations[0].packageImgUrl} className="rounded-xl brightness-75 col-span-2 w-full h-full" alt="" />
        </div>
      </section>

      <section className="relative h-72 my-10">
        <div className="absolute inset-0 z-0">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            modules={[Autoplay, Pagination]}
            className="h-full"
          >
            {[tour_packages1, tour_packages2, tour_packages3, tour_packages4].map((item, index) => (
              <SwiperSlide key={index} className=" ">
                <div className="h-72 w-[80vw] mx-auto relative">
                  <div className="absolute mt-16 ml-6 z-10">
                    <h2 style={{ fontFamily: 'Brush Script MT' }} className="text-5xl text-gray-200">Spritual Peace</h2>
                    <h2 className="text-3xl font-bold mt-4 text-gray-200">{item.Heading}</h2>
                    <span className="text-gray-100">Starting from <span className="text-xl font-bold ml-4">{item.Destinations[0].currSymbol}{item.Destinations[0].twoPaxOccupancy}</span></span>
                  </div>
                  <img src={item.Destinations[0].packageImgUrl} alt='banner-image' className="object-cover h-72 w-[80vw] mb-4 rounded-2xl mx-auto brightness-50" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Special Pooja  */}

      <section className="py-16 bg-white">
        <div className="">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold mb-2">
              Special <span style={{ fontFamily: 'Brush Script MT' }} className="text-blue-600 font-script">Pooja</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Manifest peace, prosperity and enlightenment in your life with our sacred poojas and hawans.
            </p>
          </div>

          {/* Crousel  */}

          <Carousel className="w-[80vw] mx-auto" plugins={[
            Autoplays({
              delay: 2000,
            }),
          ]}>
            <CarouselContent className="-ml-1">
              {destinations?.map((destination, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4 relative">
                  <div className="p-3">
                    <img src={destination.packageImgUrl} alt="" className="rounded-xl h-56 w-96 " />
                    <h2 className="text-lg font-semibold flex justify-center">{destination.packageName}</h2>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </div>
      </section>

      <section className="w-full mx-auto px-6 py-12 text-center bg-[#ebf3f4]">
        <h2 className="text-4xl font-semibold">Why Plan Your <span style={{ fontFamily: 'Brush Script MT' }} className="text-[#5dcce8]">Sacred Tours</span> With Us?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/resnble.svg" alt="emt offer1" />
            <h4 className="text font-semibold ft-600 mt-15">Reasonable Prices</h4>
            <p class="text mt-2"></p>
            Get Unique Darshan packages at cost-effective prices like never before.
            <p></p>
          </div>
          <div className="flex flex-col items-center">
            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/instant.svg" alt="emt offer2" />
            <h4 className="text font-semibold ft-600 mt-15">Instant Bookings</h4>
            <p class="text mt-2"></p>
            Enjoy Fast-paced booking on your desired destination with ease.
            <p></p>
          </div>
          <div className="flex flex-col items-center">
            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/guide.svg" alt="emt offer3" />
            <h4 className="text font-semibold ft-600 mt-15">Guided tours</h4>
            <p class="text mt-2"></p>
            Have personalised travelling experience with additional guide assistance.
            <p></p>
          </div>
          <div className="flex flex-col items-center">
            <img className="size-16" src="https://easydarshan.com/Content/home-page/img/suprt.svg" alt="emt offer4" />
            <h4 className="text font-semibold ft-600 mt-15">24/7 Customer Support</h4>
            <p class="text mt-2"></p>
            GConnect with our experts and get 24/7 continuous guidance on your tour package.
            <p></p>
          </div>
        </div>
        <div className="bg-blue-100 text-black p-3 rounded-lg text-center max-w-6xl mx-auto mt-10">
          <span className="font-bold text-xl">Email ID:</span> <span className='text-lg'>easydarshan@easemytrip.com</span> |
          <span className="font-bold text-lg"> Contact No:</span> 011 35359999
        </div>
      </section>



      <Footer />
    </div>
  )
}
