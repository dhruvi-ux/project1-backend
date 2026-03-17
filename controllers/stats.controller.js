const Package = require("../models/package.model");
const Destination = require("../models/Destination");
const User = require("../models/User");
const Booking = require("../models/Booking");

// GET all stats
exports.getAllStats = async (req, res) => {
  try {
    const packagesCount = await Package.countDocuments();
    const destinationsCount = await Destination.countDocuments();
    const usersCount = await User.countDocuments();
    const bookingsCount = await Booking.countDocuments();
    
    res.json({
      totalPackages: packagesCount,
      totalDestinations: destinationsCount,
      totalUsers: usersCount,
      totalBookings: bookingsCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};