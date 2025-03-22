import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const PackageDetailsForm = ({ formData, setFormData }) => {
    const handleChange = (field, value) => {
      setFormData({ ...formData, [field]: value });
    };
  
    return (
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Package Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>No. of Days</Label>
            <Input
              type="number"
              value={formData.noOfDays}
              onChange={(e) => handleChange("noOfDays", e.target.value)}
            />
          </div>
          <div>
            <Label>No. of Nights</Label>
            <Input
              type="number"
              value={formData.noOfNights}
              onChange={(e) => handleChange("noOfNights", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <Label>Currency Symbol</Label>
            <Input
              type="text"
              value={formData.currSymbol}
              onChange={(e) => handleChange("currSymbol", e.target.value)}
            />
          </div>
          <div>
            <Label>Currency Code</Label>
            <Input
              type="text"
              value={formData.currCode}
              onChange={(e) => handleChange("currCode", e.target.value)}
            />
          </div>
          <div>
            <Label>Conversion Rate</Label>
            <Input
              type="number"
              value={formData.conversionRate}
              onChange={(e) => handleChange("conversionRate", e.target.value)}
            />
          </div>
        </div>
      </Card>
    );
  };
  