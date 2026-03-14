const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  cert_id: {
    type: String,
    unique: true,
  },
  client: {
    type: String,
  },
  truck: {
    type: String,
  },
  date_issued: {
    type: Date,
  },
  expiration: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CalibrationCertificate', certificateSchema);
  },
  status: {
    type: String,
    enum: ['Valid', 'Expired'],
    default: 'Valid',
  },
}, {
  timestamps: true,
});

certificateSchema.pre('save', function (next) {
  if (this.expirationDate < Date.now()) {
    this.status = 'Expired';
  }
  next();
});

module.exports = mongoose.model('CalibrationCertificate', certificateSchema);