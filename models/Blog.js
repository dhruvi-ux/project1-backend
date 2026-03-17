const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'Admin'
  },
  category: {
    type: String,
    required: true,
    enum: ['Europe', 'Asia', 'Adventure', 'Romance', 'Culture', 'Greece', 'Travel Tips', 'Guides', 'Other']
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }]
}, { 
  timestamps: true 
});

// Add indexes for better query performance
blogSchema.index({ createdAt: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ published: 1 });
blogSchema.index({ title: 'text', content: 'text' }); // Text search index

module.exports = mongoose.model("Blog", blogSchema);
