import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, MapPin, User, DollarSign, Building } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetEnquiryById } from "@/hooks/enquiry.hook";

const EnquiryDetailsDialog = ({open, setOpen, enquiryId}) => {
  
    const [enquiry, setEnquiry] = useState({});
    const {loading, error, callApi:GetEnquiry} = useGetEnquiryById();

    useEffect(()=> {
        const fetchEnquiryDetail = async()=> {
            const res = await GetEnquiry(enquiryId);
            if(res) {
                setEnquiry(res.enquiry);
            }
        }
        fetchEnquiryDetail();
    }, [enquiryId])
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl p-6" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Enquiry Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Pasanger Information</h3>
            <p className="flex items-center gap-2"><User className="h-4 w-4 text-gray-500" /> {enquiry?.name}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> {enquiry?.email}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> {enquiry?.mobile}</p>
          </div>

          {/* Travel Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Travel Details</h3>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> Destination: {enquiry?.destination?.packageName}</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> Place to Visit: {enquiry?.destination?.stayCity}</p>
            <p className="flex items-center gap-2"><Building className="h-4 w-4 text-gray-500" /> Package Includes: {enquiry?.destination?.packageIncludes.map(pac=> <span key={pac._id}>{pac.Name},</span>)}</p>

            <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-500" /> Departure Date: {new Date(enquiry?.travelDate).toLocaleDateString()}</p>
            <p>Adults: {enquiry?.adult}, Children: {enquiry?.child}, Infants: {enquiry?.infant}</p>
          </div>

          {/* Destination & Pricing Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Destination & Pricing</h3>
            <p>Type: {enquiry?.destination?.DestinationType}</p>
            <p>Number of Days: {enquiry?.destination?.noOfDays}, Nights: {enquiry?.destination?.noOfNights}</p>
            <p className="flex items-center gap-2 font-semibold text-green-600">
            {enquiry?.destination?.currSymbol}
              Price per Person: {enquiry?.destination?.currSymbol}{enquiry?.destination?.twoPaxOccupancy}
            </p>
            {enquiry?.destination?.CuttingPrice.IsActive && (
              <p className="flex items-center gap-2 font-semibold text-red-500">
                {enquiry?.destination?.currSymbol}
                Discounted Price: {enquiry?.destination?.currSymbol}{enquiry?.destination?.CuttingPrice.Amount}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
            <p>Enquiry Status: <span className={`font-semibold ${enquiry?.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>{enquiry?.status}</span></p>
            <p>Payment Status: <span className={`font-semibold ${enquiry?.paymentStatus === 'pending' ? 'text-red-500' : 'text-green-500'}`}>{enquiry?.paymentStatus}</span></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDetailsDialog;
