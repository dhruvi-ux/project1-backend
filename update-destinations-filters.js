const mongoose = require("mongoose");
require("dotenv").config();
const Destination = require("./models/Destination");

// Destination filter data based on typical characteristics
const destinationFilters = {
  "Bali": {
    mood: ['Relaxation', 'Cultural', 'Beach', 'Nature'],
    budgetRange: 'Mid-Range',
    bestSeason: ['Spring', 'Summer', 'Fall'],
    travelType: ['Solo', 'Couple', 'Friends'],
    highlights: ['Beautiful beaches', 'Rice terraces', 'Hindu temples', 'Yoga retreats', 'Surfing'],
    estimatedBudget: { min: 40, max: 100, currency: 'USD' }
  },
  "Paris": {
    mood: ['Romantic', 'Cultural', 'Urban'],
    budgetRange: 'Luxury',
    bestSeason: ['Spring', 'Fall'],
    travelType: ['Couple', 'Solo', 'Friends'],
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River', 'French cuisine', 'Fashion'],
    estimatedBudget: { min: 100, max: 250, currency: 'USD' }
  },
  "Tokyo": {
    mood: ['Urban', 'Cultural', 'Adventure'],
    budgetRange: 'Mid-Range',
    bestSeason: ['Spring', 'Fall'],
    travelType: ['Solo', 'Couple', 'Friends'],
    highlights: ['Modern technology', 'Traditional temples', 'Sushi', 'Cherry blossoms', 'Shopping'],
    estimatedBudget: { min: 80, max: 180, currency: 'USD' }
  },
  "Santorini": {
    mood: ['Romantic', 'Relaxation', 'Beach'],
    budgetRange: 'Luxury',
    bestSeason: ['Spring', 'Summer', 'Fall'],
    travelType: ['Couple', 'Friends'],
    highlights: ['Sunset views', 'White-washed buildings', 'Wine tasting', 'Volcanic beaches'],
    estimatedBudget: { min: 120, max: 300, currency: 'USD' }
  },
  "New York": {
    mood: ['Urban', 'Cultural', 'Party'],
    budgetRange: 'Luxury',
    bestSeason: ['Spring', 'Fall'],
    travelType: ['Solo', 'Couple', 'Friends', 'Family'],
    highlights: ['Statue of Liberty', 'Times Square', 'Broadway shows', 'Museums', 'Skyline'],
    estimatedBudget: { min: 150, max: 350, currency: 'USD' }
  },
  "Maldives": {
    mood: ['Relaxation', 'Romantic', 'Beach', 'Nature'],
    budgetRange: 'Luxury',
    bestSeason: ['Winter', 'Spring'],
    travelType: ['Couple', 'Family'],
    highlights: ['Overwater bungalows', 'Crystal-clear waters', 'Diving', 'Private islands'],
    estimatedBudget: { min: 200, max: 500, currency: 'USD' }
  },
  "Dubai": {
    mood: ['Urban', 'Luxury', 'Adventure'],
    budgetRange: 'Luxury',
    bestSeason: ['Winter', 'Spring'],
    travelType: ['Couple', 'Family', 'Friends'],
    highlights: ['Burj Khalifa', 'Desert safari', 'Luxury shopping', 'Modern architecture'],
    estimatedBudget: { min: 120, max: 300, currency: 'USD' }
  },
  "Iceland": {
    mood: ['Adventure', 'Nature'],
    budgetRange: 'Mid-Range',
    bestSeason: ['Summer', 'Winter'],
    travelType: ['Solo', 'Couple', 'Friends'],
    highlights: ['Northern lights', 'Glaciers', 'Hot springs', 'Waterfalls', 'Volcanic landscapes'],
    estimatedBudget: { min: 100, max: 200, currency: 'USD' }
  },
  "Barcelona": {
    mood: ['Cultural', 'Urban', 'Beach', 'Party'],
    budgetRange: 'Mid-Range',
    bestSeason: ['Spring', 'Summer', 'Fall'],
    travelType: ['Solo', 'Couple', 'Friends'],
    highlights: ['Sagrada Familia', 'Gothic Quarter', 'Beaches', 'Tapas', 'Gaudí architecture'],
    estimatedBudget: { min: 70, max: 150, currency: 'USD' }
  },
  "Thailand": {
    mood: ['Adventure', 'Beach', 'Cultural', 'Party'],
    budgetRange: 'Budget',
    bestSeason: ['Winter', 'Spring'],
    travelType: ['Solo', 'Couple', 'Friends', 'Group'],
    highlights: ['Temples', 'Street food', 'Islands', 'Night markets', 'Affordable luxury'],
    estimatedBudget: { min: 30, max: 80, currency: 'USD' }
  },
  "Switzerland": {
    mood: ['Adventure', 'Nature', 'Romantic'],
    budgetRange: 'Luxury',
    bestSeason: ['Summer', 'Winter'],
    travelType: ['Couple', 'Family', 'Friends'],
    highlights: ['Swiss Alps', 'Skiing', 'Chocolate', 'Scenic trains', 'Mountain villages'],
    estimatedBudget: { min: 150, max: 350, currency: 'USD' }
  },
  "Rome": {
    mood: ['Cultural', 'Urban', 'Romantic'],
    budgetRange: 'Mid-Range',
    bestSeason: ['Spring', 'Fall'],
    travelType: ['Couple', 'Family', 'Friends'],
    highlights: ['Colosseum', 'Vatican', 'Roman Forum', 'Italian cuisine', 'Historic sites'],
    estimatedBudget: { min: 80, max: 180, currency: 'USD' }
  }
};

async function updateDestinations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const destinations = await Destination.find({});
    console.log(`📍 Found ${destinations.length} destinations to update`);

    let updated = 0;
    let notFound = 0;

    for (const dest of destinations) {
      // Try to match by name (case-insensitive, partial match)
      let filterData = null;
      
      for (const [key, value] of Object.entries(destinationFilters)) {
        if (dest.name.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(dest.name.toLowerCase())) {
          filterData = value;
          break;
        }
      }

      if (filterData) {
        await Destination.findByIdAndUpdate(dest._id, {
          $set: {
            mood: filterData.mood,
            budgetRange: filterData.budgetRange,
            bestSeason: filterData.bestSeason,
            travelType: filterData.travelType,
            highlights: filterData.highlights,
            estimatedBudget: filterData.estimatedBudget
          }
        });
        console.log(`✅ Updated: ${dest.name}`);
        updated++;
      } else {
        // Set default values for destinations not in our list
        await Destination.findByIdAndUpdate(dest._id, {
          $set: {
            mood: ['Cultural', 'Adventure'],
            budgetRange: 'Mid-Range',
            bestSeason: ['Year-Round'],
            travelType: ['Solo', 'Couple', 'Family'],
            highlights: ['Beautiful scenery', 'Local culture', 'Great food'],
            estimatedBudget: { min: 50, max: 150, currency: 'USD' }
          }
        });
        console.log(`⚠️  Set defaults for: ${dest.name}`);
        notFound++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated with specific data: ${updated}`);
    console.log(`   Set with default data: ${notFound}`);
    console.log(`   Total: ${destinations.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating destinations:", error);
    process.exit(1);
  }
}

updateDestinations();
