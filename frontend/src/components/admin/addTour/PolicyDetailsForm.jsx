import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PolicyDetailsForm = ({ formData, setFormData }) => {
    const handleChange = (field, value) => {
      setFormData({
        ...formData,
        policy: {
          ...formData.policy,
          [field]: value,
        },
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Start Day</Label>
              <Input
                type="number"
                value={formData.policy.sday || ""}
                onChange={(e) => handleChange("sday", e.target.value)}
              />
            </div>
            <div>
              <Label>Start Month</Label>
              <Input
                type="number"
                value={formData.policy.smonth || ""}
                onChange={(e) => handleChange("smonth", e.target.value)}
              />
            </div>
            <div>
              <Label>Start Year</Label>
              <Input
                type="number"
                value={formData.policy.syear || ""}
                onChange={(e) => handleChange("syear", e.target.value)}
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.policy.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.policy.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
            <div>
              <Label>Booking Type</Label>
              <Input
                type="text"
                value={formData.policy.bookingType || ""}
                onChange={(e) => handleChange("bookingType", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export { PolicyDetailsForm };
  