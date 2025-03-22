import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InclusionsExclusionsForm = ({ formData, setFormData }) => {
    const handleChange = (type, index, value) => {
      const updatedList = [...(formData[type] || [])];
      updatedList[index] = { [type === "inclusion" ? "inclussion" : "exclussion"]: value };
      setFormData({ ...formData, [type]: updatedList });
    };
  
    const addItem = (type) => {
      setFormData({
        ...formData,
        [type]: [...(formData[type] || []), { [type === "inclusion" ? "inclussion" : "exclussion"]: "" }],
      });
    };
  
    const removeItem = (type, index) => {
      const updatedList = (formData[type] || []).filter((_, i) => i !== index);
      setFormData({ ...formData, [type]: updatedList });
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inclusions & Exclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Inclusions</h3>
            {(formData?.inclusion || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={item?.inclussion || ""}
                  onChange={(e) => handleChange("inclusion", index, e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeItem("inclusion", index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={() => addItem("inclusion")} className="mt-2">Add Inclusion</Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Exclusions</h3>
            {(formData?.exclusion || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  type="text"
                  value={item?.exclussion || ""}
                  onChange={(e) => handleChange("exclusion", index, e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeItem("exclusion", index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={() => addItem("exclusion")} className="mt-2">Add Exclusion</Button>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default InclusionsExclusionsForm;
  