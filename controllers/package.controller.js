const Package = require("../models/package.model");

// CREATE package
exports.createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all packages (no pagination - return all)
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .sort({ createdAt: -1 });
    
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 GET minimal packages for admin list view (OPTIMIZED)
exports.getMinimalPackages = async (req, res) => {
  try {
    const packages = await Package.find()
      .select('packageName destination packageType duration.days duration.nights price.amount price.currency heroImage')
      .sort({ createdAt: -1 })
      .lean(); // Convert to plain JavaScript objects for better performance
    
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET packages by destination - optimized query
exports.getPackagesByDestination = async (req, res) => {
  try {
    const urlDestination = req.params.destination;
    
    // Convert URL format (e.g., "new-york-city") to search format
    const searchTerm = urlDestination.replace(/-/g, ' ');
    
    // Search with case-insensitive regex and trim whitespace
    const packages = await Package.find({
      destination: new RegExp('^\\s*' + escapeRegExp(searchTerm) + '\\s*$', 'i')
    }).sort({ createdAt: -1 });
    
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET single package
exports.getSinglePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE package
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE package
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
