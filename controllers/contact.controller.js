const Contact = require('../models/Contact');

// Public: Submit a contact form (no auth required)
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, userId } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: `Missing fields — subject: "${subject}", message: "${message}"`
      });
    }

    if (message.length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long' });
    }

    const contactData = { name, email, phone, subject, message, status: 'pending' };
    if (userId) contactData.userId = userId;

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({ success: true, message: 'Your message has been sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
  }
};


exports.getUserContacts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Also fetch by email so contacts submitted without userId (public form) still show
    const User = require('../models/User');
    const user = await User.findById(userId).select('email').lean();

    const query = user
      ? { $or: [{ userId }, { email: user.email }] }
      : { userId };

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Create a new contact inquiry
exports.createContact = async (req, res) => {
  try {
    const { userId } = req.params;
    const { subject, message } = req.body;

    // Validation
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }

    const contact = new Contact({
      userId,
      subject,
      message,
      status: 'pending'
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact inquiry created successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating contact inquiry',
      error: error.message
    });
  }
};

// Get a single contact
exports.getContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId)
      .populate('userId', 'name email phone')
      .populate('adminReply.repliedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
};

// Admin: Reply to a contact inquiry
exports.replyToContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { message } = req.body;
    const adminId = req.user?.id; // Assuming admin ID from auth middleware

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: 'replied',
        adminReply: {
          message,
          repliedAt: new Date(),
          repliedBy: adminId
        },
        updatedAt: new Date()
      },
      { new: true }
    ).populate('adminReply.repliedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error replying to contact',
      error: error.message
    });
  }
};

// Admin: Get all contacts (with pagination)
exports.getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .populate('userId', 'name email phone')
      .populate('adminReply.repliedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
};

// Admin: Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    const allowed = ['pending', 'replied', 'resolved'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ success: true, message: 'Status updated', contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status', error: error.message });
  }
};

// Admin: Mark contact as resolved
exports.resolveContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      {
        status: 'resolved',
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact marked as resolved',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resolving contact',
      error: error.message
    });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
};
