const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public routes
router.post("/", protect, controller.createBooking);

// Protected routes (require authentication)
router.get("/", protect, admin, controller.getAllBookings);
router.get("/minimal", protect, admin, controller.getAllBookingsMinimal);
router.get("/count/:userId", protect, controller.getUserBookingCount);
router.get("/user/:userId", protect, controller.getUserBookings);
router.get("/user/:userId/minimal", protect, controller.getUserBookingsMinimal); // 🔥 NEW: Optimized user bookings
router.get("/:id", protect, controller.getBooking);
router.put("/:id/status", protect, controller.updateBookingStatus);
router.delete("/:id", protect, controller.deleteBooking);

module.exports = router;