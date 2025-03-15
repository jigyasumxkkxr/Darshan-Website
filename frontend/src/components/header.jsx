import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Login from "./UserAuthentication";

export default function Header() {

  const [open, setOpen] = useState();
  const [openLogin, setOpenLogin] = useState(false);
  const [action, setAction] = useState('login');

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
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button className="relative bg-blue-500 hover:bg-blue-600 rounded-full font-semibold text-white text-[13px]" onMouseEnter={()=> setOpen(true)} >
                  Login or Signup
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="pr-10" onMouseLeave={()=>setOpen(false)}>
                <DropdownMenuItem onClick={()=>{setOpenLogin(true); setAction('login')}}>
                  <div className="flex items-center gap-3 p-2">
                  <FaRegUser size={20} />
                  <span className="font-medium">Customer Login</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Login open={openLogin} action={action} setAction={setAction} setOpen={setOpenLogin} />
    </header>
  )
}