const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel_db');

// Define User model (same as in backend)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

async function promoteToAdmin(email) {
  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`User with email ${email} not found.`);
      return;
    }
    
    // Update user role to admin
    user.role = 'admin';
    await user.save();
    
    console.log(`User ${email} has been promoted to admin.`);
    console.log(`User details:`, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    
    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    mongoose.connection.close();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Usage: node create_admin.js <email>');
  console.log('Example: node create_admin.js admin@example.com');
  mongoose.connection.close();
} else {
  promoteToAdmin(email);
}