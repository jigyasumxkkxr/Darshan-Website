import express from "express";
import { 
    addDestination, 
    getDestinations, 
    getDestination, 
    removeDestination 
} from "../controllers/destination.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 

const router = express.Router();


router.post("/add", isAuthenticated, addDestination);
router.get("/getall",isAuthenticated, getDestinations);
router.get("/get/:id",isAuthenticated, getDestination);
router.delete("/delete/:id", isAuthenticated, removeDestination);

export default router;
