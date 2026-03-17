const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

// Admin routes for managing users
router.get('/', protect, admin, userController.getAllUsers);

// Update user by ID
router.put('/:id', protect, admin, userController.updateUser);

// Delete user by ID
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
