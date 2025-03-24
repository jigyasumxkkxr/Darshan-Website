import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const AdditionalOptionsForm = ({ formData, setFormData }) => {
    const handleChange = (field, value) => {
      setFormData({
        ...formData,
        selectedOption: {
          ...formData.selectedOption,
          [field]: value,
        },
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Option</Label>
              <Input
                type="text"
                value={formData?.selectedOption?.option || ""}
                onChange={(e) => handleChange("option", e.target.value)}
              />
            </div>
            <div>
              <Label>Two Pax Rate</Label>
              <Input
                type="number"
                value={formData?.selectedOption?.twoPaxRate || ""}
                onChange={(e) => handleChange("twoPaxRate", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export { AdditionalOptionsForm };
  