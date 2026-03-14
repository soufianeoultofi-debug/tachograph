const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  vin: {
    type: String,
  },
  client: {
    type: String,
  },
  appareil: {
    type: String,
  },
  statut: {
    type: String,
    enum: ['Active', 'Inactive', 'Maintenance'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Truck', truckSchema);
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