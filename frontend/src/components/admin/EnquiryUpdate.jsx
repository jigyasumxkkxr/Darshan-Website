import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, MapPin, User, DollarSign, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetEnquiryById, useUpdateEnquiryStatus } from "@/hooks/enquiry.hook";

const EnquiryUpdateDialog = ({ open, setOpen, enquiry }) => {

    const [status, setStatus] = useState(enquiry.status);
    const [paymentStatus, setPaymentStatus] = useState(enquiry.paymentStatus);
    const { loading, callApi: UpdateStatus } = useUpdateEnquiryStatus();

    const handleUpdate = async () => {
        console.log({status, paymentStatus});
        const res = await UpdateStatus(enquiry._id, { status, paymentStatus });
        if (res) {
            console.log(res.message);
            setOpen(false);
        }
        
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-5xl p-6" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Update Enquiry</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* User Details */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">User Information</h3>
                        <p className="flex items-center gap-2"><User className="h-4 w-4 text-gray-500" /> {enquiry.name}</p>
                        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> {enquiry.email}</p>
                        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> {enquiry.mobile}</p>
                    </div>

                    {/* Status Update Section */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Update Status</h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="text-sm font-medium">Enquiry Status</label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Payment Status</label>
                                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select payment status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EnquiryUpdateDialog;
