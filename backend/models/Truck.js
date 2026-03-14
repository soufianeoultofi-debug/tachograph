const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  plateNumber: {
    type: String,
    required: [true, 'Plate number is required'],
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Truck', truckSchema);