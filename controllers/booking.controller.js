const Booking = require("../models/Booking");

// CREATE booking
exports.createBooking = async (req, res) => {
  try {
    // Extract user information from the authenticated user
    const bookingData = {
      ...req.body,
      userId: req.user._id.toString(),
      userEmail: req.user.email
    };
    
    // If packageDetails is not provided but packageName/destination are, try to populate from package
    if (!bookingData.packageDetails && bookingData.packageName && bookingData.destination) {
      try {
        const Package = require('../models/package.model');
        const packageInfo = await Package.findOne({ 
          packageName: bookingData.packageName, 
          destination: bookingData.destination 
        });
        
        if (packageInfo) {
          bookingData.packageDetails = {
            packageName: packageInfo.packageName,
            destination: packageInfo.destination,
            duration: packageInfo.duration,
            packageType: packageInfo.packageType,
            price: packageInfo.price,
            heroImage: packageInfo.heroImage,
            gallery: packageInfo.gallery,
            inclusions: packageInfo.inclusions,
            exclusions: packageInfo.exclusions,
            accommodation: packageInfo.accommodation,
            transportAndTransfer: packageInfo.transportAndTransfer,
            meals: packageInfo.meals,
            itinerary: packageInfo.itinerary,
            averageRating: packageInfo.averageRating,
            userReviews: packageInfo.userReviews
          };
        }
      } catch (packageError) {
        console.log('Could not fetch package details:', packageError.message);
      }
    }
    
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all bookings with pagination (FULL DATA)
exports.getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Booking.countDocuments();
    
    res.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET all bookings with MINIMAL data for table (optimized)
exports.getAllBookingsMinimal = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Only select fields needed for table display
    const bookings = await Booking.find()
      .select('_id packageName destination numberOfTravelers status totalAmount bookingDate createdAt customerDetails.firstName customerDetails.lastName customerDetails.email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Booking.countDocuments();
    
    res.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET bookings by user with pagination (FULL DATA)
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Booking.countDocuments({ userId });
    
    res.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET user bookings with MINIMAL data (optimized)
exports.getUserBookingsMinimal = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Only select fields needed for display
    const bookings = await Booking.find({ userId })
      .select('_id packageName destination numberOfTravelers status totalAmount bookingDate createdAt packageDetails.duration customerDetails.firstName customerDetails.lastName customerDetails.email customerDetails.phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Booking.countDocuments({ userId });
    
    res.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Check if the requesting user is the owner of the booking or an admin
    if (booking.userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. You can only view your own bookings." });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET booking count for user (optimized)
exports.getUserBookingCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Booking.countDocuments({ userId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};