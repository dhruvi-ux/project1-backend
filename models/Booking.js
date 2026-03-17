const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  packageDetails: {
    packageName: String,
    destination: String,
    duration: {
      days: Number,
      nights: Number
    },
    packageType: String,
    price: {
      amount: Number,
      currency: String
    },
    heroImage: String,
    gallery: [String],
    inclusions: [String],
    exclusions: [String],
    accommodation: String,
    transportAndTransfer: String,
    meals: String,
    itinerary: [{
      day: Number,
      title: String,
      description: String
    }],
    averageRating: Number,
    userReviews: [{
      userName: String,
      comment: String,
      date: String
    }]
  },
  customerDetails: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  numberOfTravelers: {
    type: Number,
    required: true,
    default: 1
  },
  specialRequests: String,
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);