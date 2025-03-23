import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllEnquiry } from "@/hooks/enquiry.hook";
import EnquiryDetailsDialog from "@/components/admin/EnquiryDetails";
import EnquiryUpdateDialog from "@/components/admin/EnquiryUpdate";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const EnquiriesPage = () => {

    const { loading, error, callApi: GetAllEnquiry } = useGetAllEnquiry();
    const [enquiries, setEnquiries] = useState([]);
    const [openView, setOpenView] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [enquiryId, setEnquiryId] = useState(null);
    const [enquiry, setEnquiry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllEnquiry = async () => {
            const res = await GetAllEnquiry();
            if (res) {
                setEnquiries(res.enquiries);
            }
        }
        fetchAllEnquiry();
    }, [openUpdate])


    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex p-2 items-center gap-1 cursor-pointer hover:bg-gray-100 w-fit mb-2" onClick={() => navigate(-1)}>
                <FaArrowLeftLong />
                <span className="font-medium">Dashboard</span>
            </div>
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Enquiries</h2>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-32 w-full" />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Package</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Travel Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {enquiries?.map((enquiry) => (
                                    <TableRow key={enquiry._id}>
                                        <TableCell>{enquiry.packageName}</TableCell>
                                        <TableCell>{enquiry.user.name}</TableCell>
                                        <TableCell>{enquiry.user.mobile}</TableCell>
                                        <TableCell>{enquiry.user.email}</TableCell>
                                        <TableCell>{new Date(enquiry.travelDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                enquiry.status === "confirmed" ? "success" :
                                                    enquiry.status === "cancelled" ? "destructive" : "secondary"
                                            }>
                                                {enquiry.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                enquiry.paymentStatus === "paid" ? "success" :
                                                    enquiry.paymentStatus === "failed" ? "destructive" : "secondary"
                                            }>
                                                {enquiry.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='flex gap-1'>
                                            <Button size="sm" onClick={() => { setOpenView(true); setEnquiryId(enquiry._id); }}>View</Button>
                                            <Button size='sm' onClick={() => { setOpenUpdate(true); setEnquiry(enquiry); }}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
            {
                enquiryId && <EnquiryDetailsDialog open={openView} setOpen={setOpenView} enquiryId={enquiryId} />
            }
            {
                enquiry && <EnquiryUpdateDialog open={openUpdate} setOpen={setOpenUpdate} enquiry={enquiry} />
            }
        </div>
    );
};

export default EnquiriesPage;
