const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  workOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkOrder',
    required: true,
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
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