import { Destination } from "../models/destination.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";

export const addDestination = async (req, res) => {
    try {
        const admin = req.user;
        if (!admin || !admin.role === 'admin' || !admin.is_verified) {
            return res.status(401).json({success:false, message: 'You are not authorized to perform this action ' });
        }  

        const destination = await Destination.create(req.body);

        return res.status(201).json({ success: true, message: "Destination created successfully", destination });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error in adding destination' });
    }
}



export const getDestinations= async(req, res)=> {
    try {
        const destinations = await Destination.find();

        return res.status(200).json({ success: true, message: "Destination fetched successfully", destinations });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error in finding destination' });
        
    }
}

export const getDestination = async(req, res)=> {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }

        return res.status(200).json({ success: true, message: "Destination fetched successfully", destination });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error in finding destination' });
    }
}

export const removeDestination = async(req, res)=> {
    try {
        const admin = req.user;
        if (!admin || !admin.role === 'admin' || !admin.is_verified) {
            return res.status(401).json({success:false, message: 'You are not authorized to perform this action ' });
        }

        const destination = await Destination.findByIdAndDelete(req.params.id);
        if(!destination) {
            return res.status(404).json({success:false,  message: 'Destination not found' });
        }
        return res.status(200).json({ success: true, message: "Destination removed successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Error in removing destination' });
    }
}


// 📌 Update a Destination
export const updateDestination = async (req, res) => {
    try {
        const admin = req.user;
        if (!admin || admin.role !== 'admin' || !admin.is_verified) {
            return res.status(401).json({ success: false, message: "You are not authorized to perform this action" });
        }

        const { id } = req.params;
        const updates = req.body;

        const destination = await Destination.findById(id);
        if (!destination) {
            return res.status(404).json({ success: false, message: "Destination not found" });
        }

        // Update fields
        Object.keys(updates).forEach((key) => {
            destination[key] = updates[key];
        });

        await destination.save();

        return res.status(200).json({ success: true, message: "Destination updated successfully", destination });

    } catch (error) {
        console.error("Error updating destination:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error in updating destination" });
    }
};
