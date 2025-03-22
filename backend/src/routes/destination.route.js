import express from "express";
import { 
    addDestination, 
    getDestinations, 
    getDestination, 
    removeDestination, 
    updateDestination,
    searchDestination
} from "../controllers/destination.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 

const router = express.Router();


router.post("/add", isAuthenticated, addDestination);
router.get("/getall", getDestinations);
router.get("/get/:id", getDestination);
router.delete("/delete/:id", isAuthenticated, removeDestination);
router.route('/update/:id').put(isAuthenticated, updateDestination);
router.route('/search').post(searchDestination);

export default router;
