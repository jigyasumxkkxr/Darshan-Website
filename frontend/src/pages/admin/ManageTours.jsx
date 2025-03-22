import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    // Fetch tours from backend API
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data));
  }, []);

  const onSubmit = (data) => {
    if (editingTour) {
      // Update tour
      fetch(`/api/tours/${editingTour._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Tour updated successfully");
          setOpen(false);
          setEditingTour(null);
          reset();
        });
    } else {
      // Add new tour
      fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Tour added successfully");
          setOpen(false);
          reset();
        });
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setOpen(true);
    reset(tour);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      fetch(`/api/tours/${id}`, { method: "DELETE" })
        .then(() => toast.success("Tour deleted successfully"))
        .catch(() => toast.error("Failed to delete tour"));
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Tours</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { setOpen(true); setEditingTour(null); reset(); }}>Add New Tour</Button>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Package Name</TableHead>
                <TableHead>Destination Type</TableHead>
                <TableHead>Start City</TableHead>
                <TableHead>End City</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour) => (
                <TableRow key={tour._id}>
                  <TableCell>{tour.packageName}</TableCell>
                  <TableCell>{tour.DestinationType}</TableCell>
                  <TableCell>{tour.startCity}</TableCell>
                  <TableCell>{tour.endCity}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(tour)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(tour._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add / Edit Tour Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTour ? "Edit Tour" : "Add New Tour"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="packageName">Package Name *</Label>
              <Input id="packageName" {...register("packageName", { required: true })} />
            </div>
            <div>
              <Label htmlFor="DestinationType">Destination Type *</Label>
              <Input id="DestinationType" {...register("DestinationType", { required: true })} />
            </div>
            <div>
              <Label htmlFor="startCity">Start City *</Label>
              <Input id="startCity" {...register("startCity", { required: true })} />
            </div>
            <div>
              <Label htmlFor="endCity">End City *</Label>
              <Input id="endCity" {...register("endCity", { required: true })} />
            </div>
            <Button type="submit">{editingTour ? "Update" : "Add"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
