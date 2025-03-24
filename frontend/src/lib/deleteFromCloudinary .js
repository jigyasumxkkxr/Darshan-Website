export const deleteFromCloudinary = async (publicId) => {
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/destroy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error("Cloudinary deletion failed");
  
      console.log("Image deleted from Cloudinary:", publicId);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };