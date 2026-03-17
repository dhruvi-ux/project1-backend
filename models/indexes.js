// This file initializes database indexes for performance optimization
// Run this on application startup

const User = require('./User');
const Booking = require('./Booking');
const Package = require('./package.model');
const Destination = require('./Destination');
const Contact = require('./Contact');

const initializeIndexes = async () => {
  try {
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ User email index created');

    // Booking indexes
    await Booking.collection.createIndex({ userId: 1 });
    await Booking.collection.createIndex({ createdAt: -1 });
    console.log('✅ Booking userId and createdAt indexes created');

    // Package indexes
    await Package.collection.createIndex({ destination: 1 });
    await Package.collection.createIndex({ packageName: 1 });
    console.log('✅ Package destination and packageName indexes created');

    // Destination indexes
    await Destination.collection.createIndex({ name: 1 });
    console.log('✅ Destination name index created');

    // Contact indexes
    await Contact.collection.createIndex({ createdAt: -1 });
    await Contact.collection.createIndex({ email: 1 });
    console.log('✅ Contact createdAt and email indexes created');

    console.log('✅ All database indexes initialized successfully');
  } catch (error) {
    console.error('Error initializing indexes:', error);
  }
};

module.exports = initializeIndexes;
