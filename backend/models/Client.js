const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Client name is required'],
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Please add a valid email'],
  },
  telephone: {
    type: String,
  },
  entreprise: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Client', clientSchema);
