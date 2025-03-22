import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const HotelDetailsForm = ({ data, setData }) => {
  const [hotels, setHotels] = useState(data.hotels || []);

  const handleAddHotel = () => {
    setHotels([...hotels, {
      cityName: "",
      hotelName: "",
      hotelHeading: "",
      hotelType: "",
      roomType: "",
      noOfRoom: "",
      mealPlan: "",
      mealDetail: "",
      hotelDescription: "",
      hotelImg: "",
      starImg: "",
      noOfNight: "",
      pax1Rate: "",
      pax2Rate: "",
      pax3Rate: "",
      pax4Rate: "",
      extraAdltRate: "",
      extraChldRate: "",
      optionName: "",
      emtHotelCode: "",
      rating: "",
      formatedDate: "",
      data: "",
      selectedRoom: "",
      htlDetailImg: ""
    }]);
  };

  const handleRemoveHotel = (index) => {
    const updatedHotels = hotels.filter((_, i) => i !== index);
    setHotels(updatedHotels);
    setData({ ...data, hotels: updatedHotels });
  };

  const handleChange = (index, field, value) => {
    const updatedHotels = [...hotels];
    updatedHotels[index][field] = value;
    setHotels(updatedHotels);
    setData({ ...data, hotels: updatedHotels });
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">Hotel Details</h2>
      {hotels.map((hotel, index) => (
        <div key={index} className="border p-4 pt-10 rounded-lg space-y-2 relative">
          <Button
            onClick={() => handleRemoveHotel(index)}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
          >
            Remove
          </Button>
          <Input
            placeholder="City Name"
            value={hotel.cityName}
            onChange={(e) => handleChange(index, "cityName", e.target.value)}
          />
          <Input
            placeholder="Hotel Name *"
            value={hotel.hotelName}
            onChange={(e) => handleChange(index, "hotelName", e.target.value)}
          />
          <Input
            placeholder="Room Type"
            value={hotel.roomType}
            onChange={(e) => handleChange(index, "roomType", e.target.value)}
          />
          <Input
            placeholder="No. of Rooms"
            type="number"
            value={hotel.noOfRoom}
            onChange={(e) => handleChange(index, "noOfRoom", e.target.value)}
          />
          <Input
            placeholder="Meal Plan"
            value={hotel.mealPlan}
            onChange={(e) => handleChange(index, "mealPlan", e.target.value)}
          />
          <Input
            placeholder={`Hotel Description *`}
            value={hotel.hotelDescription}
            onChange={(e) => handleChange(index, "hotelDescription", e.target.value)}
          />
          <div>
            <Label>Hotel Image <span className="text-red-500">*</span></Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, "hotelImg", e.target.files[0])}
            />
          </div>
        </div>
      ))}
      <Button onClick={handleAddHotel}>Add Hotel</Button>
    </div>
  );
};

export default HotelDetailsForm;
