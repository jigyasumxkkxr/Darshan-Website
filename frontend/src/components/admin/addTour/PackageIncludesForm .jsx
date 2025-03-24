import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const options = [
  { Name: "Hotel", Class: "hotrl-coi" },
  { Name: "Sightseeing", Class: "sigtee-coi" },
  { Name: "Transfer", Class: "tranf-coi" },
  { Name: "Meal", Class: "break-coi" },
];

const PackageIncludesForm = ({ formData, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updatedIncludes = [...formData.packageIncludes];

    if (field === "Name") {
      const selectedOption = options.find((option) => option.Name === value);
      updatedIncludes[index] = { ...updatedIncludes[index], Name: value, Class: selectedOption?.Class || "" };
    } else {
      updatedIncludes[index][field] = value;
    }

    setFormData({ ...formData, packageIncludes: updatedIncludes });
  };

  // Add new package include
  const handleAddInclude = () => {
    setFormData({ ...formData, packageIncludes: [...formData.packageIncludes, { Available: false, Name: "", Class: "" }] });
  };

  // Remove package include
  const handleRemoveInclude = (index) => {
    const updatedIncludes = [...formData.packageIncludes];
    updatedIncludes.splice(index, 1);
    setFormData({ ...formData, packageIncludes: updatedIncludes });
  };

  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Package Includes</h2>

      {formData.packageIncludes.map((include, index) => (
        <CardContent key={index} className="border p-4 rounded-lg relative">
          <div className="grid grid-cols-2 gap-4">
            {/* Available Checkbox */}
            <div>
              <Label>Available</Label>
              <Input
                type="checkbox"
                checked={include.Available}
                onChange={(e) => handleChange(index, "Available", e.target.checked)}
              />
            </div>

            {/* Name Select Dropdown */}
            <div>
              <Label>Name</Label>
              <Select
                value={include.Name}
                onValueChange={(value) => handleChange(index, "Name", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Name" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option, idx) => (
                    <SelectItem key={idx} value={option.Name}>
                      {option.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Remove Button */}
          <Button 
            variant="destructive" 
            className="mt-2" 
            onClick={() => handleRemoveInclude(index)}
            disabled={formData.packageIncludes.length === 1} // Prevent removing last item
          >
            Remove
          </Button>
        </CardContent>
      ))}

      {/* Add Button */}
      <Button className="mt-4" onClick={handleAddInclude}>
        Add More
      </Button>
    </Card>
  );
};

export default PackageIncludesForm;
