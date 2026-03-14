const asyncHandler = require('express-async-handler');
const WorkOrder = require('../models/WorkOrder');

exports.getWorkOrders = asyncHandler(async (req, res) => {
  const workOrders = await WorkOrder.find().sort('-createdAt');
  res.json(workOrders);
});

exports.createWorkOrder = asyncHandler(async (req, res) => {
  const { camion, client, service, technicien, statut } = req.body;

  const workOrder = await WorkOrder.create({
    camion,
    client,
    service,
    technicien,
    statut: statut || 'Pending',
  });

  res.status(201).json(workOrder);
});

exports.updateWorkOrder = asyncHandler(async (req, res) => {
  let workOrder = await WorkOrder.findById(req.params.id);

  if (!workOrder) {
    res.status(404);
    throw new Error('Work order not found');
  }

  const { camion, client, service, technicien, statut } = req.body;

  if (camion) workOrder.camion = camion;
  if (client) workOrder.client = client;
  if (service) workOrder.service = service;
  if (technicien) workOrder.technicien = technicien;
  if (statut) workOrder.statut = statut;

  workOrder = await workOrder.save();
  res.json(workOrder);
});

exports.deleteWorkOrder = asyncHandler(async (req, res) => {
  const workOrder = await WorkOrder.findByIdAndDelete(req.params.id);

  if (!workOrder) {
    res.status(404);
    throw new Error('Work order not found');
  }

  res.json({ message: 'Work order removed' });
});