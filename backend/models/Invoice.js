const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  client: {
    type: String,
  },
  camion: {
    type: String,
  },
  montant: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
