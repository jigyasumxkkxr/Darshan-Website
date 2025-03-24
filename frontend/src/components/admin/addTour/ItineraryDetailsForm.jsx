import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ItineraryDetailsForm = ({ formData, setFormData }) => {
  const [itineraries, setItineraries] = useState(
    formData.tableItinerary?.Itinerarys || []
  );

  const handleAddItinerary = () => {
    setItineraries([
      ...itineraries,
      {
        Days: "",
        Heading: "",
        Itinerary: [
          {
            PackageId: "",
            PackageCode: "",
            SubPackageId: "",
            SubPackageName: "",
            DayNumber: "",
            UsedType: "",
            Time: "",
            Description: "",
            ItineraryCode: "",
            Counter: 1,
          },
        ],
      },
    ]);
  };

  const handleRemoveItinerary = (index) => {
    const updatedItineraries = itineraries.filter((_, i) => i !== index);
    setItineraries(updatedItineraries);
    setFormData({
      ...formData,
      tableItinerary: { Itinerarys: updatedItineraries },
    });
  };

  const handleChange = (index, field, value) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[index][field] = value;
    setItineraries(updatedItineraries);
    setFormData({
      ...formData,
      tableItinerary: { Itinerarys: updatedItineraries },
    });
  };

  const handleDescriptionChange = (itineraryIndex, descIndex, field, value) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[itineraryIndex].Itinerary[descIndex][field] = value;
    setItineraries(updatedItineraries);
    setFormData({
      ...formData,
      tableItinerary: { Itinerarys: updatedItineraries },
    });
  };

  const handleAddDescription = (itineraryIndex) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[itineraryIndex].Itinerary.push({
      PackageId: "",
      PackageCode: "",
      SubPackageId: "",
      SubPackageName: "",
      DayNumber: "",
      UsedType: "",
      Time: "",
      Description: "",
      ItineraryCode: "",
      Counter: updatedItineraries[itineraryIndex].Itinerary.length + 1,
    });
    setItineraries(updatedItineraries);
    setFormData({
      ...formData,
      tableItinerary: { Itinerarys: updatedItineraries },
    });
  };

  const handleRemoveDescription = (itineraryIndex, descIndex) => {
    const updatedItineraries = [...itineraries];
    updatedItineraries[itineraryIndex].Itinerary.splice(descIndex, 1);
    setItineraries(updatedItineraries);
    setFormData({
      ...formData,
      tableItinerary: { Itinerarys: updatedItineraries },
    });
  };

  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Itinerary Details</h2>
      {itineraries.map((itinerary, index) => (
        <CardContent key={index} className="mb-4 border p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Day <span className="text-red-500">*</span></Label>
              <Input
                type="number"
                value={itinerary.Days}
                onChange={(e) => handleChange(index, "Days", e.target.value)}
                placeholder="Enter Day Number"
              />
            </div>
            <div>
              <Label>Heading <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                value={itinerary.Heading}
                onChange={(e) => handleChange(index, "Heading", e.target.value)}
                placeholder="Enter Itinerary Heading"
              />
            </div>
          </div>

          {/* Itinerary Descriptions */}
          {itinerary.Itinerary.map((desc, descIndex) => (
            <div key={descIndex} className="mt-4 border p-4 rounded-lg">
              <Label>Description <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                value={desc.Description}
                onChange={(e) =>
                  handleDescriptionChange(index, descIndex, "Description", e.target.value)
                }
                placeholder="Enter Description"
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="text"
                  placeholder="Package Code"
                  value={desc.PackageCode}
                  onChange={(e) =>
                    handleDescriptionChange(index, descIndex, "PackageCode", e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Time"
                  value={desc.Time}
                  onChange={(e) =>
                    handleDescriptionChange(index, descIndex, "Time", e.target.value)
                  }
                />
              </div>
              <Button
                variant="destructive"
                className="mt-2"
                onClick={() => handleRemoveDescription(index, descIndex)}
              >
                Remove Description
              </Button>
            </div>
          ))}

          <Button variant="outline" className="mt-2" onClick={() => handleAddDescription(index)}>
            Add Description
          </Button>

          <Button
            variant="destructive"
            className="mt-2"
            onClick={() => handleRemoveItinerary(index)}
          >
            Remove Itinerary
          </Button>
        </CardContent>
      ))}
      <Button variant="outline" onClick={handleAddItinerary}>Add Itinerary</Button>
    </Card>
  );
};

export default ItineraryDetailsForm;
