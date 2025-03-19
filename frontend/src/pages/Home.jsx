import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, MessageSquare, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-poppins overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0 z-0">
          <img
            src="src/assets/image.png"
            alt="Varanasi Ghats"
            className="object-cover brightness-75 w-full h-full"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="font-script text-5xl md:text-6xl mb-2">Start Your Spiritual Trails</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">In The Most Divine Destinations</h2>

          <div className="w-full max-w-2xl mt-8 relative">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search Your Dream Pilgrimage!"
                  className="pl-10 h-14 rounded-l-full rounded-r-none border-r-0 bg-white text-black"
                />
              </div>
              <Button className="h-14 px-8 rounded-l-none rounded-r-full bg-blue-600 hover:bg-blue-700 text-white">
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
            <h2 className="text-3xl font-bold mb-2">
              Explore <span className="text-blue-600 font-script">Top Pilgrimage</span> Sites of India
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Discover the spiritual heart of India by exploring its top pilgrimage sites like never before
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Destination Cards */}
              {[
                { name: "Shirdi", desc: "Experience divine blessings at Sai Baba Temple" },
                { name: "Tirupati", desc: "Visit the sacred Venkateshwara Temple" },
                { name: "Varanasi", desc: "Experience the spiritual essence at the holy Ganges" },
                { name: "Kedarnath", desc: "Trek to the majestic Himalayan shrine" },
              ].map((place, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative h-64">
                      <img
                        src="src/assets/image.png"
                        alt={place.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{place.name}</h3>
                      <p className="text-muted-foreground text-sm">{place.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-white shadow-md hidden md:flex items-center justify-center"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 p-0 bg-white shadow-md hidden md:flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Plan Trip Button */}
          <div className="fixed bottom-8 right-8 z-20">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
              <MessageSquare className="h-5 w-5" />
              Plan Your Trip
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
