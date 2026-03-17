const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression"); // 🔥 Add compression
require("dotenv").config();
const initializeIndexes = require("./models/indexes");

const app = express();

// 🔥 Enable gzip compression for all responses
app.use(compression());

/* ✅ CORS for development and production */
app.use(cors({
  origin: [
    "http://localhost:4200",
    "http://localhost:4300",
    "http://localhost:4500",
    "https://project1-client.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.status(200).send("Backend is working ✅");
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    // Initialize indexes after connection
    initializeIndexes();
  })
  .catch(err => console.error("Mongo error:", err));

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/destinations", require("./routes/destinationRoutes"));
app.use("/api/packages", require("./routes/package.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/stats", require("./routes/stats.routes"));
app.use("/api/blogs", require("./routes/blog.routes")); // 🔥 Blog routes


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

