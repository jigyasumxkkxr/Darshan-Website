import express from "express";
import { addTourPackage, getAllTourPackages, getTourPackageById, deleteTourPackage } from "../controllers/destinationTourPackages.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// 📌 Add a new tour package
router.post("/add", isAuthenticated ,addTourPackage);

// 📌 Get all tour packages
router.get("/all",getAllTourPackages);

// 📌 Get a single tour package by ID
router.get("/get/:id",getTourPackageById);

// 📌 Delete a tour package by ID
router.delete("/remove/:id", isAuthenticated ,deleteTourPackage);

export default router;
