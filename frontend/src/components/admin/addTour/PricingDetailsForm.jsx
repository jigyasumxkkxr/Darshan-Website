import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PricingDetailsForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number(value),
    }));
  };

  const handleCuttingPriceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      CuttingPrice: {
        ...prev.CuttingPrice,
        [name]: type === "checkbox" ? checked : Number(value),
      },
    }));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="onePaxOccupancy">One Pax Occupancy</Label>
          <Input
            id="onePaxOccupancy"
            name="onePaxOccupancy"
            type="number"
            value={data.onePaxOccupancy || ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div>
          <Label htmlFor="twoPaxOccupancy">Two Pax Occupancy</Label>
          <Input
            id="twoPaxOccupancy"
            name="twoPaxOccupancy"
            type="number"
            value={data.twoPaxOccupancy || ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div>
          <Label htmlFor="childWithBed">Child with Bed</Label>
          <Input
            id="childWithBed"
            name="childWithBed"
            type="number"
            value={data.childWithBed || ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div>
          <Label htmlFor="childWithOutBed">Child without Bed</Label>
          <Input
            id="childWithOutBed"
            name="childWithOutBed"
            type="number"
            value={data.childWithOutBed || ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div>
          <Label htmlFor="extraAdult">Extra Adult</Label>
          <Input
            id="extraAdult"
            name="extraAdult"
            type="number"
            value={data.extraAdult || ""}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
      </div>

      {/* Cutting Price Section */}
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Cutting Price</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="IsActive"
              name="IsActive"
              type="checkbox"
              checked={data.CuttingPrice?.IsActive || false}
              onChange={handleCuttingPriceChange}
              className="mr-2"
            />
            <Label htmlFor="IsActive">Active</Label>
          </div>
          <div>
            <Label htmlFor="Amount">Amount</Label>
            <Input
              id="Amount"
              name="Amount"
              type="number"
              value={data.CuttingPrice?.Amount || ""}
              onChange={handleCuttingPriceChange}
              placeholder="Enter cutting price"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailsForm;
