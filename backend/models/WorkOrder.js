const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  completionDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('WorkOrder', workOrderSchema);