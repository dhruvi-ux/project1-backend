const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Public route (contact form)
router.post('/', contactController.submitContact);

// User routes
router.get('/user/:userId', contactController.getUserContacts);
router.post('/user/:userId', contactController.createContact);
router.get('/:contactId', contactController.getContact);

// Admin routes
router.get('/', contactController.getAllContacts);
router.post('/:contactId/reply', contactController.replyToContact);
router.patch('/:contactId/status', contactController.updateContactStatus);
router.patch('/:contactId/resolve', contactController.resolveContact);
router.delete('/:contactId', contactController.deleteContact);

module.exports = router;
