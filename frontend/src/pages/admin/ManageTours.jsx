import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteDestination, useGetAllDestination } from "@/hooks/destination.hook";
import { removeDestinationFromStore, setDestinations } from "@/store/destinationSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function ManageTours() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations } = useSelector(state => state.destination);
  const { callApi: DeleteDestination } = useDeleteDestination();
  const { callApi: getAllDestinations } = useGetAllDestination();


  useEffect(() => {
    const fetchAllDestinations = async () => {
      const res = await getAllDestinations();
      if (res) {
        dispatch(setDestinations(res.destinations));
      }
    }
    fetchAllDestinations();
  }, [])


  const handleDelete = async (id) => {

    const res = await DeleteDestination(id);
    if (res) {
      console.log(res.message);
      dispatch(removeDestinationFromStore(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex p-2 items-center gap-1 cursor-pointer hover:bg-gray-100 w-fit mb-2" onClick={() => navigate(-1)}>
        <FaArrowLeftLong />
        <span className="font-medium">Dashboard</span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Tours</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/admin/manage-tour/add')}>Add New Tour</Button>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Package Name</TableHead>
                <TableHead>Destination Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations?.map((tour) => (
                <TableRow key={tour._id}>
                  <TableCell>{tour.packageName}</TableCell>
                  <TableCell>{tour.DestinationType}</TableCell>
                  <TableCell>{tour.currSymbol}{tour.twoPaxOccupancy}</TableCell>
                  <TableCell>{tour.noOfDays} Days / {tour.noOfNights} Nights</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/admin/manage-tour/update/${tour._id}`)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(tour._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
