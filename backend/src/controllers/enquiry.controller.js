import { Destination } from "../models/destination.model.js";
import { Enquiry } from "../models/enquiry.model.js";


// 📌 Add a new enquiry
export const addEnquiry = async (req, res) => {
    try {
        const user = req.user._id;
        const { packageName, destination, subtype, name, mobile, email, adult, child, infant, travelDate, specialRequests, status,totalAmmount, paymentStatus } = req.body;

        if (!packageName || !destination || !name || !mobile || !email) {
            return res.status(400).json({success:false, message: "Required fields are missing" });
        }
        const destinationTour = await Destination.findById(destination);
        if (!destinationTour) {
            return res.status(404).json({success:false, message: "Destination not found" });
        }

        const newEnquiry = new Enquiry({
            packageName,
            user,
            destination,
            subtype,
            name,
            mobile,
            email,
            adult,
            child,
            infant,
            travelDate,
            specialRequests,
            status,
            totalAmmount,
            paymentStatus
        });

        await newEnquiry.save();

        destinationTour.bookings = destinationTour.bookings + 1;
        await destinationTour.save();

        return res.status(201).json({success:true, message: "Enquiry added successfully", enquiry: newEnquiry });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
};

// 📌 Get all enquiries
export const getAllEnquiries = async (req, res) => {
    try {
        const admin = req.user;
        if(!admin || !admin.role === 'admin' || !admin.is_verified) {
            return res.status(401).json({success:false, message: "Unauthorized to perform this action" });
        }

        const enquiries = await Enquiry.find().populate("user", "name email mobile");
        return res.status(200).json({success:true, enquiries});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
};

// 📌 Get a single enquiry by ID
export const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id).populate("user destination");
        if (!enquiry) {
            return res.status(404).json({success:false, message: "Enquiry not found" });
        }
        return res.status(200).json({success:true, enquiry});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
};

// 📌 Delete an enquiry
export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) {
            return res.status(404).json({success:false, message: "Enquiry not found" });
        }

        const destination = await Destination.findById(enquiry.destination);
        if (destination) {
            destination.bookings = destination.bookings - 1;
            await destination.save();
        }
        return res.status(200).json({success:true, message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
};


// 📌 Update Enquiry Status
export const updateEnquiryStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const validStatuses = ["pending", "confirmed", "cancelled"];
        const validPaymentStatuses = ["paid", "pending", "failed"];
        const admin = req.user;

        if(!admin || !admin.role === "admin" || !admin.is_verified) {
            return res.status(401).json({success:false, message: "Unauthorized" });
        }
        // Check if status is valid
        if (!validStatuses.includes(status)) {
            return res.status(400).json({success:false,  message: "Invalid status value" });
        }
        // Check if payment status is valid

        if (!validPaymentStatuses.includes(paymentStatus)) {
            return res.status(400).json({success:false, message: "Invalid payment status value" });
        }

        // Find and update enquiry
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status, paymentStatus },
            { new: true, runValidators: true }
        );

        if (!updatedEnquiry) {
            return res.status(404).json({success:false, message: "Enquiry not found" });
        }

        return res.status(200).json({
            success:true,
            message: "Enquiry status updated successfully",
            enquiry: updatedEnquiry
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: "Internal Server Error" });
    }
};


// 📌 Get all enquiries for a specific user
export const getUserEnquiries = async (req, res) => {
    try {
        const userId = req.user._id; 

        const enquiries = await Enquiry.find({ user: userId });

        if (!enquiries.length) {
            return res.status(404).json({ success: false, message: "No enquiries found for this user" });
        }

        return res.status(200).json({ success: true, enquiries });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


