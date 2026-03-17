const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// GET all destinations (no pagination - return all)
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find()
      .sort({ createdAt: -1 });
    
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single destination by ID
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new destination
router.post("/", async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update destination
router.put("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE destination
router.delete("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
