const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller");
const { protect, admin } = require("../middleware/auth.middleware");

// Public routes
router.get("/minimal", controller.getMinimalBlogs); // Optimized for client list view
router.get("/stats", controller.getBlogStats); // Blog statistics
router.get("/:id", controller.getBlogById); // Single blog
router.get("/", controller.getAllBlogs); // All blogs with filters

// Admin routes (protected)
router.post("/", protect, admin, controller.createBlog);
router.put("/:id", protect, admin, controller.updateBlog);
router.delete("/:id", protect, admin, controller.deleteBlog);

module.exports = router;
