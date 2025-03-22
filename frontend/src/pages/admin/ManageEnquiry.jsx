import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const EnquiriesPage = () => {
    const [enquiries, setEnquiries] = useState([
        {
          "_id": "6601a1f5e56f3a001c8a1a01",
          "packageName": "Paris Getaway",
          "user": "6601a1f5e56f3a001c8b2001",
          "destination": "6601a1f5e56f3a001c8c3001",
          "subtype": "Luxury",
          "name": "John Doe",
          "mobile": "+1234567890",
          "email": "john.doe@example.com",
          "adult": 2,
          "child": 1,
          "infant": 0,
          "travelDate": "2025-04-10T00:00:00Z",
          "specialRequests": "Need a sea-facing room",
          "status": "pending",
          "totalAmmount": 2500,
          "paymentStatus": "pending",
          "createdAt": "2025-03-15T10:30:00Z"
        },
        {
          "_id": "6601a1f5e56f3a001c8a1a02",
          "packageName": "London Explorer",
          "user": "6601a1f5e56f3a001c8b2002",
          "destination": "6601a1f5e56f3a001c8c3002",
          "subtype": "Budget",
          "name": "Alice Smith",
          "mobile": "+9876543210",
          "email": "alice.smith@example.com",
          "adult": 1,
          "child": 0,
          "infant": 1,
          "travelDate": "2025-05-22T00:00:00Z",
          "specialRequests": "Vegan meal preference",
          "status": "confirmed",
          "totalAmmount": 1800,
          "paymentStatus": "paid",
          "createdAt": "2025-03-10T14:20:00Z"
        },
        {
          "_id": "6601a1f5e56f3a001c8a1a03",
          "packageName": "New York Adventure",
          "user": "6601a1f5e56f3a001c8b2003",
          "destination": "6601a1f5e56f3a001c8c3003",
          "subtype": "Standard",
          "name": "Michael Brown",
          "mobile": "+1122334455",
          "email": "michael.brown@example.com",
          "adult": 3,
          "child": 2,
          "infant": 0,
          "travelDate": "2025-06-15T00:00:00Z",
          "specialRequests": "Extra legroom seats",
          "status": "cancelled",
          "totalAmmount": 3200,
          "paymentStatus": "failed",
          "createdAt": "2025-03-05T09:00:00Z"
        }
      ]
      );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    return (
        <div className="p-6 max-w-5xl mx-auto">
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
                                    <TableHead>Destination</TableHead>
                                    <TableHead>Travel Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {enquiries.map((enquiry) => (
                                    <TableRow key={enquiry._id}>
                                        <TableCell>{enquiry.packageName}</TableCell>
                                        <TableCell>{enquiry.user.name}</TableCell>
                                        <TableCell>{enquiry.destination.packageName}</TableCell>
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
                                        <TableCell>
                                            <Button size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default EnquiriesPage;
