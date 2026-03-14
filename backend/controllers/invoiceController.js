const asyncHandler = require('express-async-handler');
const Invoice = require('../models/Invoice');

exports.getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find().sort('-createdAt');
  res.json(invoices);
});

exports.createInvoice = asyncHandler(async (req, res) => {
  const { numero, client, camion, montant, statut } = req.body;

  const invoice = await Invoice.create({
    numero,
    client,
    camion,
    montant,
    statut: statut || 'Pending',
  });

  res.status(201).json(invoice);
});

exports.updateInvoice = asyncHandler(async (req, res) => {
  let invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  const { numero, client, camion, montant, statut } = req.body;

  if (numero) invoice.numero = numero;
  if (client) invoice.client = client;
  if (camion) invoice.camion = camion;
  if (montant) invoice.montant = montant;
  if (statut) invoice.statut = statut;

  invoice = await invoice.save();
  res.json(invoice);
});

exports.deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  res.json({ message: 'Invoice removed' });
});
