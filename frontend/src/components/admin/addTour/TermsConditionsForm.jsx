import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const TermsConditionsForm = ({ formData, setFormData }) => {
  
  const handleChange = (index, field, value) => {
    const updatedTerms = [...formData.term_Condition];
    updatedTerms[index][field] = value;
    setFormData({ ...formData, term_Condition: updatedTerms });
  };

  const handleListChange = (index, listIndex, value) => {
    const updatedTerms = [...formData.term_Condition];
    updatedTerms[index].list[listIndex] = value;
    setFormData({ ...formData, term_Condition: updatedTerms });
  };

  const addListItem = (index) => {
    const updatedTerms = [...formData.term_Condition];
    updatedTerms[index].list.push("");
    setFormData({ ...formData, term_Condition: updatedTerms });
  };

  const removeListItem = (index, listIndex) => {
    const updatedTerms = [...formData.term_Condition];
    updatedTerms[index].list.splice(listIndex, 1);
    setFormData({ ...formData, term_Condition: updatedTerms });
  };

  const addTermCondition = () => {
    setFormData({
      ...formData,
      term_Condition: [
        ...formData.term_Condition,
        { heading: "", term_Condition: "", list: [""] },
      ],
    });
  };

  const removeTermCondition = (index) => {
    const updatedTerms = [...formData.term_Condition];
    updatedTerms.splice(index, 1);
    setFormData({ ...formData, term_Condition: updatedTerms });
  };

  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>

      {formData.term_Condition.map((term, index) => (
        <CardContent key={index} className="border p-4 rounded-lg mb-4">
          <Label>Heading</Label>
          <Input
            type="text"
            value={term.heading}
            onChange={(e) => handleChange(index, "heading", e.target.value)}
            placeholder="Enter Heading"
          />

          <Label className="mt-2">Term Condition</Label>
          <Input
            type="text"
            value={term.term_Condition}
            onChange={(e) => handleChange(index, "term_Condition", e.target.value)}
            placeholder="Enter Term Condition"
          />

          <Label className="mt-2">List Items</Label>
          {term.list.map((item, listIndex) => (
            <div key={listIndex} className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                value={item}
                onChange={(e) => handleListChange(index, listIndex, e.target.value)}
                placeholder={`List item ${listIndex + 1}`}
              />
              <Button
                variant="destructive"
                onClick={() => removeListItem(index, listIndex)}
                disabled={term.list.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button onClick={() => addListItem(index)} className="mt-2">
            Add List Item
          </Button>

          <Button
            variant="destructive"
            className="mt-4 ml-2"
            onClick={() => removeTermCondition(index)}
            disabled={formData.term_Condition.length === 1}
          >
            Remove Term Condition
          </Button>
        </CardContent>
      ))}

      <Button className="mt-4" onClick={addTermCondition}>
        Add More Terms & Conditions
      </Button>
    </Card>
  );
};

export default TermsConditionsForm;
