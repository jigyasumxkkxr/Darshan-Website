import { DestinationTourPackages } from "../models/destinationTourPackages.model";


// ✅ Add a new tour package
export const addTourPackage = async (req, res) => {
    try {
        const { Heading, Description, Destinations, Details, FAQ } = req.body;
        const admin = req.user;

        if(!admin || admin.role !== 'admin' || !admin.is_verified) {
            return res.status(401).json({success:false,  message: 'Unauthorized to perform this action' });
        }

        if(!Heading || Destinations.length === 0) {
            return res.status(400).json({success:false,  message: 'Heading and Destination are required' });
        }

        const newTourPackage = new DestinationTourPackages({
            Heading,
            Description,
            Destinations,
            Details,
            FAQ
        });

        const savedPackage = await newTourPackage.save();
        res.status(201).json({ success: true, message: "Tour package added successfully", data: savedPackage });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding tour package", error: error.message });
    }
};

// ✅ Get all tour packages
export const getAllTourPackages = async (req, res) => {
    try {
        const tourPackages = await DestinationTourPackages.find();
        res.status(200).json({ success: true, data: tourPackages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tour packages", error: error.message });
    }
};

// ✅ Get a single tour package by ID
export const getTourPackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const tourPackage = await DestinationTourPackages.findById(id).populate("Destinations");

        if (!tourPackage) {
            return res.status(404).json({ success: false, message: "Tour package not found" });
        }

        res.status(200).json({ success: true, data: tourPackage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching tour package", error: error.message });
    }
};

// ✅ Delete a tour package by ID
export const deleteTourPackage = async (req, res) => {
    try {
        const admin = req.user;

        if(!admin || admin.role !== 'admin' || !admin.is_verified) {
            return res.status(401).json({success:false,  message: 'Unauthorized to perform this action' });
        }

        const { id } = req.params;
        const deletedPackage = await DestinationTourPackages.findByIdAndDelete(id);

        if (!deletedPackage) {
            return res.status(404).json({ success: false, message: "Tour package not found" });
        }

        res.status(200).json({ success: true, message: "Tour package deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting tour package", error: error.message });
    }
};
