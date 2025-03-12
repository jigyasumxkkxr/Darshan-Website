import express from "express";
import { 
    addEnquiry, 
    getAllEnquiries, 
    getEnquiryById, 
    deleteEnquiry, 
    updateEnquiryStatus, 
    getUserEnquiries
} from "../controllers/enquiry.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 

const router = express.Router();

// 📌 Add a new enquiry (Authenticated User)
router.post("/add", isAuthenticated, addEnquiry);

// 📌 Get all enquiries (Admin Only)
router.get("/getall", isAuthenticated, getAllEnquiries);

// 📌 Get a single enquiry by ID
router.get("/get/:id", isAuthenticated, getEnquiryById);

// 📌 Get all enquiries of the logged-in user
router.get("/user/all", isAuthenticated, getUserEnquiries);

// 📌 Delete an enquiry (Admin Only)
router.delete("/delete/:id", isAuthenticated, deleteEnquiry);

// 📌 Update enquiry status & payment status (Admin Only)
router.put("/update/:id", isAuthenticated, updateEnquiryStatus);

export default router;
