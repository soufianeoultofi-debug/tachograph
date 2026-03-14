const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');

// @desc    Get all clients
// @route   GET /api/clients
exports.getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find().sort('-createdAt');
  res.json(clients);
});

// @desc    Create a client
// @route   POST /api/clients
exports.createClient = asyncHandler(async (req, res) => {
  const { nom, telephone, entreprise, email } = req.body;
  
  const client = await Client.create({
    nom,
    telephone,
    entreprise,
    email,
  });

  res.status(201).json(client);
});

// @desc    Update client
// @route   PUT /api/clients/:id
exports.updateClient = asyncHandler(async (req, res) => {
  let client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  const { nom, telephone, entreprise, email } = req.body;
  
  if (nom) client.nom = nom;
  if (telephone) client.telephone = telephone;
  if (entreprise) client.entreprise = entreprise;
  if (email) client.email = email;

  client = await client.save();
  res.json(client);
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
exports.deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  res.json({ message: 'Client removed' });
});