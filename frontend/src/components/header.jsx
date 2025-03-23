import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Login from "./UserAuthentication";
import logo from "@/assets/image.png"; // Corrected import
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "@/lib/isTokenExpired";
import { useLogout } from "@/hooks/user.hook";
import { setAuth, setToken } from "@/store/authSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [action, setAction] = useState('login');
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, token} = useSelector(state => state.auth);
  const {callApi: Logout} = useLogout();
  const dispatch = useDispatch();


  const handleLogout = async() => {
      const res = await Logout();
      if(res) {
        console.log(res.message);
        dispatch(setAuth(null));
        dispatch(setToken(null));
      }
  }

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between py-4 px-6 md:px-16 lg:px-48">
        {/* Logo (Always Left) */}
        <div className="flex-1">
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="EasyDarshan Logo"
              width={300}
              height={80}
              className="h-8 md:h-10 w-auto"
            />
          </a>
        </div>

        {/* Desktop Navigation (Always Right) */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/tour-packages/Chardham" className="text-foreground hover:text-primary">Chardham</a>
          <a href="/tour-packages/Special Pooja" className="text-foreground hover:text-primary">Special Poojas</a>
          <a href="/tour-packages/Fixed Departure" className="text-foreground hover:text-primary">Fixed Departure</a>
          <a href="/darshan-kutumb" className="text-foreground hover:text-primary">Darshan Kutumb</a>
          <a href="/about-us" className="text-foreground hover:text-primary">About Us</a>
        </nav>

        {/* Right-side Controls */}
        <div className="hidden md:flex md:flex-col items-center space-x-4">
          {/* Call Info Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-fit font-sans cursor-pointer">˅</button>
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

          {/* Login Dropdown */}
          {
            (!user || isTokenExpired(token) || !token || !user?.is_verified) ?
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>          
                  <Button
                  className="relative bg-blue-500 hover:bg-blue-600 rounded-full font-semibold text-white text-[13px]"
                  onMouseEnter={() => setOpen(true)}
                >
                  Login or Signup
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="pr-10" onMouseLeave={() => setOpen(false)}>
                <DropdownMenuItem onClick={() => { setOpenLogin(true); setAction('login') }}>
                  <div className="flex items-center gap-3 p-2">
                    <FaRegUser size={20} />
                    <span className="font-medium">Customer Login</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>:
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold" onClick={handleLogout}>Logout</Button>
          }
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation (Shown when menuOpen is true) */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-white py-4 space-y-4 border-t">
          <a href="/tour-packages/Chardham" className="text-foreground hover:text-primary">Chardham</a>
          <a href="/tour-packages/Special Pooja" className="text-foreground hover:text-primary">Special Poojas</a>
          <a href="/tour-packages/Fixed Departure" className="text-foreground hover:text-primary">Fixed Departure</a>
          <a href="/darshan-kutumb" className="text-foreground hover:text-primary">Darshan Kutumb</a>
          <a href="/about-us" className="text-foreground hover:text-primary">About Us</a>

          {/* Mobile Login Button */}
          {
            (!user || isTokenExpired(token) || !token || !user?.is_verified) ?
            <Button className="bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold" onClick={() => { setOpenLogin(true); setAction('login') }}>
            Login or Signup
          </Button>:
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold" onClick={handleLogout}>Logout</Button>
          }
        </nav>
      )}

      {/* Login Modal */}
      <Login open={openLogin} action={action} setAction={setAction} setOpen={setOpenLogin} />
    </header>
  );
}
