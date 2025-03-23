import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MailIcon, MapPin, Phone, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectItem } from "./ui/select";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "@/lib/isTokenExpired";
import { useAddEnquiry } from "@/hooks/enquiry.hook";

const EnquiryForm = ({ open, setOpen, tour }) => {
  const { register, handleSubmit } = useForm();
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const { destinations } = useSelector(state => state.destination);
  const { user, token } = useSelector(state => state.auth);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();
  const { loading, callApi: AddEnquiry } = useAddEnquiry()

  const onSubmit = async (data) => {
    if (!user || isTokenExpired(token) || !token) {
      return alert('Login to make enquiry');
    }
    if (!user?.is_verified) {
      return alert('Your account is not verified. Please verify your account to make enquiry.');
    }
    if (!selectedDestination && !tour) {
      return alert('Please select a destination first');
    }

    if (tour) {
      const res = await AddEnquiry({ ...data, adult, child, infant, packageName:tour.packageName , destination: tour._id, user: user._id });
      if (res) {
        console.log(res.message);
        setOpen(false);
      }
    }

    if (selectedDestination) { 
      const res = await AddEnquiry({ ...data, adult, child, infant, packageName:selectedDestination.packageName ,destination: selectedDestination._id, user: user._id });
      if (res) {
        console.log(res.message);
        setOpen(false);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchValue(query);
    setSelectedDestination(null)
    if (query.length > 0) {
      setFilteredDestinations(
        destinations.filter(dest =>
          dest.packageName.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredDestinations([]);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Want To Go For A Memorable Holiday?</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Destination */}
          <div className="relative">
            <Label className="text-gray-700 font-medium">Destination</Label>
            <div className="relative">
              {tour ? (
                <Input
                  {...register("packageName")}
                  value={tour.packageName}
                  placeholder="Package Name / Destination Name"
                  readOnly
                />
              ) : (
                <Input
                  {...register("packageName")}
                  placeholder="Package Name / Destination Name"
                  onChange={handleSearch}
                  value={searchValue}
                />
              )}
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            {
              filteredDestinations.length > 0 ?
                <div className={`${selectedDestination ? 'hidden' : 'block'} absolute z-10 bg-white rounded-lg w-full max-h-64 overflow-y-auto shadow-lg`}>
                  {
                    filteredDestinations.map((des, index) => (
                      <span key={index} className="block cursor-pointer py-3 text-md hover:bg-gray-200 pl-3 border-b" onClick={() => { setSearchValue(des.packageName); setSelectedDestination(des) }}>{des.packageName}</span>
                    ))
                  }
                </div> : null
            }
          </div>

          {/* Date of Departure & City of Departure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className='text-gray-700 font-medium'>Date of Departure</Label>
              <div className="relative">
                <Input {...register("travelDate")} type="date" />
                <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <Label className='text-gray-700 font-medium'>City of Departure</Label>
              <div className="relative">
                <Input {...register("cityOfDeparture")} placeholder="City of departure" />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Name & Phone Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className='text-gray-700 font-medium'>Name</Label>
              <div className="relative">
                <Input {...register("name")} placeholder="Your Name" />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <Label className='text-gray-700 font-medium'>Phone Number</Label>
              <div className="relative">
                <Input {...register("mobile")} placeholder="Mobile No." />
                <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label className='text-gray-700 font-medium'>Email ID</Label>
            <div className="relative">
              <Input {...register("email")} placeholder="Your E-mail Address" />
              <MailIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Passenger Count */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className='text-gray-700 font-medium'>Adult</Label>
              <div className="flex items-center justify-between border rounded-lg p-2">
                <Button type="button" variant="ghost" size="icon" onClick={() => setAdult(Math.max(0, adult - 1))}>-</Button>
                <span className="text-lg">{adult}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => setAdult(adult + 1)}>+</Button>
              </div>
            </div>
            <div>
              <Label className='text-gray-700 font-medium'>Child</Label>
              <div className="flex items-center justify-between border rounded-lg p-2">
                <Button type="button" variant="ghost" size="icon" onClick={() => setChild(Math.max(0, child - 1))}>-</Button>
                <span className="text-lg">{child}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => setChild(child + 1)}>+</Button>
              </div>
            </div>
            <div>
              <Label className='text-gray-700 font-medium'>Infant</Label>
              <div className="flex items-center justify-between border rounded-lg p-2">
                <Button type="button" variant="ghost" size="icon" onClick={() => setInfant(Math.max(0, infant - 1))}>-</Button>
                <span className="text-lg">{infant}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => setInfant(infant + 1)}>+</Button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full bg-[#125296] hover:bg-[#2b5481]">
            {loading ? 'Submiting...' : 'Enquire Now'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryForm;
