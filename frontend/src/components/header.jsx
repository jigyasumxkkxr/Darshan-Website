import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Header() {
    return (
        <header className="border-b bg-white">
        <div className="flex items-center justify-between py-4 px-48">
          <a href="/" className="flex items-center">
            <img
              src="src/assets/image.png"
              alt="EasyDarshan Logo"
              width={400}
              height={100}
              className="h-10 w-auto"
            />
          </a>

          <div className="flex flex-row">
            <nav className="hidden md:flex items-center space-x-4 mr-4">
              <a href="/chardham" className="text-foreground hover:text-primary">
                Chardham
              </a>
              <a href="/special-poojas" className="text-foreground hover:text-primary">
                Special Poojas
              </a>
              <a href="/fixed-departure" className="text-foreground hover:text-primary">
                Fixed Departure
              </a>
              <a href="/darshan-kutumb" className="text-foreground hover:text-primary">
                Darshan Kutumb
              </a>
              <a href="/about-us" className="text-foreground hover:text-primary">
                About Us
              </a>
            </nav>

            <div className="flex flex-col gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span className="w-fit font-sans cursor-pointer">˅</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <div>
                      <p className="font-semibold text-xl text-blue-700">Call us:</p>
                      <p>Tel : 011 - 35359999</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold">Login or Signup</Button>
            </div>
          </div>
        </div>
      </header>
    )
}