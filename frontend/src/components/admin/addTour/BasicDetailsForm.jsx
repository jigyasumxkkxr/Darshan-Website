import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import imageCompression from "browser-image-compression";
import { convertToBase64 } from "@/lib/convertToBase64 ";
import { uploadToCloudinary } from "@/lib/uploadToClodinary";

const PackageDetailsForm = ({ formData, setFormData }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleImageChange = async (e) => {
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

          console.log(fileUri);
          
    
          // Upload to Cloudinary
          const cloudResponse = await uploadToCloudinary(fileUri);
          if (!cloudResponse) throw new Error("Image upload failed");

          console.log(cloudResponse.secure_url);
    
          // Update state with Cloudinary URL
          setFormData({ ...formData, packageImgUrl: cloudResponse.secure_url });
        } catch (error) {
          console.error("Image Processing Error: ", error);
        }
      };
    

    return (
        <Card className="p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Package Details</h2>

            {/* Overview Section */}
            <div className="mb-4">
                <Label htmlFor="overview">Overview <span className="text-red-500">*</span></Label>
                <Input
                    id="overview"
                    value={formData.overview || ""}
                    onChange={(e) => handleChange("overview", e.target.value)}
                    placeholder="Enter overview"
                />
            </div>

            {/* Package Name Section */}
            <div className="mb-4">
                <Label htmlFor="packageName">Package Name <span className="text-red-500">*</span></Label>
                <Input
                    id="packageName"
                    value={formData.packageName || ""}
                    onChange={(e) => handleChange("packageName", e.target.value)}
                    placeholder="Enter package name"
                    required
                />
            </div>

            {/* Destination Type */}
            <div className="mb-4">
                <Label htmlFor="destinationType">Destination Type <span className="text-red-500">*</span></Label>
                <Select
                    value={formData.DestinationType || ""}
                    onValueChange={(value) => handleChange("DestinationType", value)}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Destination Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yatra">Yatra</SelectItem>
                        <SelectItem value="Pooja">Pooja</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Stay City */}
            <div className="mb-4">
                <Label htmlFor="stayCity">Stay City <span className="text-red-500">*</span></Label>
                <Input
                    id="stayCity"
                    value={formData.stayCity || ""}
                    onChange={(e) => handleChange("stayCity", e.target.value)}
                    placeholder="Enter Stay Cities"
                    required
                />
            </div>

            {/* No. of Days & No. of Nights */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <Label>No. of Days</Label>
                    <Input
                        type="number"
                        value={formData.noOfDays || ""}
                        onChange={(e) => handleChange("noOfDays", e.target.value)}
                    />
                </div>
                <div>
                    <Label>No. of Nights</Label>
                    <Input
                        type="number"
                        value={formData.noOfNights || ""}
                        onChange={(e) => handleChange("noOfNights", e.target.value)}
                    />
                </div>
            </div>

            {/* Currency Details */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                    <Label>Currency Symbol</Label>
                    <Input
                        type="text"
                        value={formData.currSymbol || ""}
                        onChange={(e) => handleChange("currSymbol", e.target.value)}
                    />
                </div>
                <div>
                    <Label>Currency Code</Label>
                    <Input
                        type="text"
                        value={formData.currCode || ""}
                        onChange={(e) => handleChange("currCode", e.target.value)}
                    />
                </div>
                <div>
                    <Label>Country Code</Label>
                    <Input
                        type="text"
                        value={formData.countryCode || ""}
                        onChange={(e) => handleChange("countryCode", e.target.value)}
                    />
                </div>
                <div>
                    <Label>Conversion Rate</Label>
                    <Input
                        type="number"
                        value={formData.conversionRate || ""}
                        onChange={(e) => handleChange("conversionRate", e.target.value)}
                    />
                </div>
            </div>

            {/* Package Image Upload */}
            <div className="mt-4">
                <Label htmlFor="packageImgUrl">Package Image <span className="text-red-500">*</span></Label>
                <Input
                    id="packageImgUrl"
                    type="file"
                    onChange={handleImageChange}
                />
                {/* Show Image Preview if an Image is Selected */}
                {formData.packageImgUrl && (
                    <img
                        src={formData.packageImgUrl}
                        alt="Selected Package"
                        className="mt-2 w-32 h-32 object-cover rounded-lg shadow"
                    />
                )}
            </div>
        </Card>
    );
};

export default PackageDetailsForm;
