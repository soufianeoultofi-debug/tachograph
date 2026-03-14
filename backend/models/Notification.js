const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text_content: {
    type: String,
    required: true,
  },
  time_label: {
    type: String,
    default: 'À l\'instant',
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'error', 'success'],
    default: 'info',
  },
  is_read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
