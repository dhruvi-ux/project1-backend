const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  gallery: [String],
  averageRating: Number,
  // New filter fields
  mood: { 
    type: [String], 
    enum: ['Adventure', 'Relaxation', 'Cultural', 'Romantic', 'Party', 'Nature', 'Urban', 'Beach'],
    default: []
  },
  budgetRange: { 
    type: String, 
    enum: ['Budget', 'Mid-Range', 'Luxury'],
    default: 'Mid-Range'
  },
  bestSeason: { 
    type: [String], 
    enum: ['Spring', 'Summer', 'Fall', 'Winter', 'Year-Round'],
    default: ['Year-Round']
  },
  travelType: { 
    type: [String], 
    enum: ['Solo', 'Couple', 'Family', 'Friends', 'Group'],
    default: ['Solo', 'Couple', 'Family']
  },
  highlights: [String],
  estimatedBudget: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  }
}, { timestamps: true });

// Add indexes for filtering
destinationSchema.index({ mood: 1 });
destinationSchema.index({ budgetRange: 1 });
destinationSchema.index({ bestSeason: 1 });
destinationSchema.index({ travelType: 1 });

module.exports = mongoose.model("Destination", destinationSchema);
