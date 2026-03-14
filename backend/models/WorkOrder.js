const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  camion: {
    type: String,
  },
  client: {
    type: String,
  },
  service: {
    type: String,
  },
  technicien: {
    type: String,
  },
  statut: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('WorkOrder', workOrderSchema);
