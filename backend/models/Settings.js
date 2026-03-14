const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  company_name: String,
  company_email: String,
  company_phone: String,
  timezone: String,
  currency: { type: String, default: 'DH' },
  language: { type: String, default: 'fr' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Settings', settingsSchema);
