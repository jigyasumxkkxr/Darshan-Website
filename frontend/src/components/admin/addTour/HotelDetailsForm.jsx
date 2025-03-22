import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import imageCompression from "browser-image-compression";
import { convertToBase64 } from "@/lib/convertToBase64 ";
import { uploadToCloudinary } from "@/lib/uploadToClodinary";

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
            htlDetailImg: "",
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

    const handleImageChange = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Compression options
            const options = {
                maxSizeMB: 0.5, // Limit size to 0.5MB
                maxWidthOrHeight: 800, // Resize to max 800px
                useWebWorker: true, // Better performance
            };

            // Compress image
            const compressedFile = await imageCompression(file, options);
            const extName = compressedFile.type === "image/png" ? "png" : "jpeg";

            // Convert to Base64
            const fileUri = await convertToBase64(compressedFile, extName);

            // Upload to Cloudinary
            const cloudResponse = await uploadToCloudinary(fileUri);
            
            if (!cloudResponse.secure_url) throw new Error("Image upload failed");

            // Update state with Cloudinary URL
            handleChange(index, "hotelImg", cloudResponse.secure_url);
        } catch (error) {
            console.error("Image Processing Error: ", error);
        }
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
                        placeholder="Hotel Description *"
                        value={hotel.hotelDescription}
                        onChange={(e) => handleChange(index, "hotelDescription", e.target.value)}
                    />
                    <div>
                        <Label>Hotel Image <span className="text-red-500">*</span></Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                        />
                        {hotel.hotelImg && (
                            <img src={hotel.hotelImg} alt="Hotel Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                        )}
                    </div>
                </div>
            ))}
            <Button onClick={handleAddHotel}>Add Hotel</Button>
        </div>
    );
};

export default HotelDetailsForm;