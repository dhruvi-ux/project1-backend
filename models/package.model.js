const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },

  destination: {
    type: String, // "paris", "kyoto"
    required: true
  },

  duration: {
    days: Number,
    nights: Number
  },

  packageType: String,

  price: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },

  heroImage: String,

  gallery: [String],

  inclusions: [String],
  exclusions: [String],

  accommodation: String,

  transportAndTransfer: {
    type: String,
    default: ''
  },

  meals: {
    type: String,
    default: ''
  },

  itinerary: [
    {
      day: Number,
      title: String,
      description: String
    }
  ],

  averageRating: Number,

  userReviews: [
    {
      userName: String,
      comment: String,
      date: String
    }
  ]
}, { timestamps: true });

// 🔥 Add indexes for better query performance
packageSchema.index({ createdAt: -1 }); // For sorting by creation date
packageSchema.index({ destination: 1 }); // For filtering by destination
packageSchema.index({ packageType: 1 }); // For filtering by package type
packageSchema.index({ 'price.amount': 1 }); // For price-based queries

module.exports = mongoose.model("Package", packageSchema);
