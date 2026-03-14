const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
  },
  email: {
    type: String,
    required: [true, 'Client email is required'],
    match: [/.+@.+\..+/, 'Please add a valid email'],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Client', clientSchema);