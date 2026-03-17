const mongoose = require("mongoose");
require("dotenv").config();
const Blog = require("./models/Blog");

async function deleteAllBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result = await Blog.deleteMany({});
    console.log(`🗑️  Successfully deleted ${result.deletedCount} blog posts`);

    console.log("\n✨ All blog data has been removed from the database");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error deleting blogs:", error);
    process.exit(1);
  }
}

deleteAllBlogs();
