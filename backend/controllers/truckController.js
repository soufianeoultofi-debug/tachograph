const asyncHandler = require('express-async-handler');
const Truck = require('../models/Truck');

exports.getTrucks = asyncHandler(async (req, res) => {
  const trucks = await Truck.find().sort('-createdAt');
  res.json(trucks);
});

exports.createTruck = asyncHandler(async (req, res) => {
  const { numero, vin, client, appareil, statut } = req.body;

  const truck = await Truck.create({
    numero,
    vin,
    client,
    appareil,
    statut: statut || 'Active',
  });

  res.status(201).json(truck);
});

exports.updateTruck = asyncHandler(async (req, res) => {
  let truck = await Truck.findById(req.params.id);

  if (!truck) {
    res.status(404);
    throw new Error('Truck not found');
  }

  const { numero, vin, client, appareil, statut } = req.body;

  if (numero) truck.numero = numero;
  if (vin) truck.vin = vin;
  if (client) truck.client = client;
  if (appareil) truck.appareil = appareil;
  if (statut) truck.statut = statut;

  truck = await truck.save();
  res.json(truck);
});

exports.deleteTruck = asyncHandler(async (req, res) => {
  const truck = await Truck.findByIdAndDelete(req.params.id);

  if (!truck) {
    res.status(404);
    throw new Error('Truck not found');
  }

  res.json({ message: 'Truck removed' });
});