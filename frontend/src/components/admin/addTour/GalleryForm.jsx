import React from "react";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/uploadToClodinary";
import { convertToBase64 } from "@/lib/convertToBase64 ";
import { deleteFromCloudinary } from "@/lib/deleteFromCloudinary ";

const GalleryForm = ({ formData, setFormData }) => {
    const handleChange = (index, field, value) => {
        const updatedGallery = [...formData.gallaryImg];
        updatedGallery[index][field] = value;
        setFormData({ ...formData, gallaryImg: updatedGallery });
    };

    const handleFileChange = async (index, file) => {
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

            // Convert to Base64
            const fileUri = await convertToBase64(compressedFile);

            // Upload to Cloudinary
            const cloudResponse = await uploadToCloudinary(fileUri);
            if (!cloudResponse) throw new Error("Image upload failed");

            // Update state with Cloudinary URL
            const updatedGallery = [...formData.gallaryImg];
            updatedGallery[index].img = cloudResponse.secure_url; // Store Cloudinary URL
            updatedGallery[index].imgPublicId = cloudResponse.public_id; // Store Cloudinary URL
            setFormData({ ...formData, gallaryImg: updatedGallery });
        } catch (error) {
            console.error("Image Processing Error: ", error);
        }
    };

    const addImage = () => {
        setFormData({
            ...formData,
            gallaryImg: [...formData.gallaryImg, { preference: "", img: null, id: "", imgPublicId: null, code: "" }],
        });
    };

    const removeImage = async (index) => {
        const updatedGallery = [...formData.gallaryImg];
        updatedGallery.splice(index, 1); // Remove from state
        setFormData({ ...formData, gallaryImg: updatedGallery });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gallery Images</CardTitle>
            </CardHeader>
            <CardContent>
                {formData.gallaryImg.map((image, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4 relative border p-4 pt-6 rounded-lg">
                        <Button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-2 bg-red-500 hover:bg-red-600 text-white"
                        >
                            Remove
                        </Button>
                        <div>
                            <Label>Preference</Label>
                            <Input
                                type="number"
                                value={image.preference}
                                onChange={(e) => handleChange(index, "preference", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Choose Image</Label>
                            <Input
                                type="file"
                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                            />
                        </div>
                        {image.img && (
                            <div className="col-span-2">
                                <Label>Image Preview</Label>
                                <img src={image.img} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                            </div>
                        )}
                    </div>
                ))}
                <Button onClick={addImage} className="mt-2">
                    Add Another Image
                </Button>
            </CardContent>
        </Card>
    );
};

export default GalleryForm;