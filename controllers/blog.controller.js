const Blog = require("../models/Blog");

// CREATE blog post
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ 
      success: true, 
      message: "Blog post created successfully",
      blog: newBlog 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET all blogs (with optional filters)
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, published, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by published status
    if (published !== undefined) {
      query.published = published === 'true';
    }

    // Search in title and content
    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET minimal blogs for list view (optimized)
exports.getMinimalBlogs = async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    let blogQuery = Blog.find(query)
      .select('title excerpt image author category readTime createdAt')
      .sort({ createdAt: -1 })
      .lean();

    // Add limit if specified
    if (limit) {
      blogQuery = blogQuery.limit(parseInt(limit));
    }

    const blogs = await blogQuery;
    
    // Set cache headers for 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    
    res.json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog post not found" 
      });
    }

    // Increment views asynchronously (don't wait)
    Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }).exec();
    
    // Set cache headers for 5 minutes
    res.set('Cache-Control', 'public, max-age=300');
    
    res.json({
      success: true,
      blog
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// UPDATE blog
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog post not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Blog post updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog post not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Blog post deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET blog statistics
exports.getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ published: true });
    const draftBlogs = await Blog.countDocuments({ published: false });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } }
    ]);

    const categoryCounts = await Blog.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.total || 0,
        categoryCounts
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
