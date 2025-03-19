import express from "express";
import { addTourPackage, getAllTourPackages, getTourPackageById, deleteTourPackage } from "../controllers/destinationTourPackages.controller.js";

const router = express.Router();

// 📌 Add a new tour package
router.post("/add", addTourPackage);

// 📌 Get all tour packages
router.get("/all", getAllTourPackages);

// 📌 Get a single tour package by ID
router.get("/:id", getTourPackageById);

// 📌 Delete a tour package by ID
router.delete("/:id", deleteTourPackage);

export default router;
