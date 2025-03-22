import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetAllTourPackages, useRemoveTourPackages } from "@/hooks/tourPackages.hook";
import { removeTourPackageFromStore, setTourPackages } from "@/store/tourPackagesSlice";



const ManageToursPackages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tourPackages} = useSelector(state=>state.tourPackages);
    const {callApi:getAllToursPackages} = useGetAllTourPackages(); 
    const {callApi:deleteToursPackage} = useRemoveTourPackages();


    useEffect(()=>{
        const fetchAllToursPackages = async () => {
            const res = await getAllToursPackages();
            if(res) {
                dispatch(setTourPackages(res.data));
            }
        }
        fetchAllToursPackages();
    }, [])

    const handleAdd = () => {

    };

    

    const handleDelete = async(id) => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
            const res = await deleteToursPackage(id);
            if(res) {
                console.log(res.message);
                dispatch(removeTourPackageFromStore(id));
            }
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
                    <CardTitle>Manage Tours Packages</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate('/admin/manage-tours-packages/add')}>Add New Tours Package</Button>
                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Package Heading</TableHead>
                                <TableHead>No. of Tours Includes</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tourPackages?.map((tourPackage) => (
                                <TableRow key={tourPackage?._id}>
                                    <TableCell>{tourPackage?.Heading}</TableCell>
                                    <TableCell>{tourPackage?.Destinations.length}</TableCell>
                                    <TableCell>
                                        <Button variant="destructive" onClick={() => handleDelete(tourPackage?._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
};

export default ManageToursPackages;
