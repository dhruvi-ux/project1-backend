const express = require("express");
const router = express.Router();
const controller = require("../controllers/package.controller");
const { protect, admin } = require("../middleware/auth.middleware");

router.post("/", protect, admin, controller.createPackage);
router.get("/minimal", controller.getMinimalPackages); // 🔥 Must be before /:id route
router.get("/destination/:destination", controller.getPackagesByDestination);
router.get("/", controller.getAllPackages);
router.get("/:id", controller.getSinglePackage);
router.put("/:id", protect, admin, controller.updatePackage);
router.delete("/:id", protect, admin, controller.deletePackage);

module.exports = router;
