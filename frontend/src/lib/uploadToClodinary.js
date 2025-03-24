export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "darshan_tour"); // Set up an unsigned preset in Cloudinary
    formData.append("folder", "darshan-website/destination"); // Optional folder
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!data.secure_url) throw new Error("Upload failed");
  
      return data; // Return the uploaded image URL
    } catch (error) {
      console.error("Cloudinary Upload Error: ", error);
      return null;
    }
  };
  