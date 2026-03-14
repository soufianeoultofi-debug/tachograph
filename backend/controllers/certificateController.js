const asyncHandler = require('express-async-handler');
const CalibrationCertificate = require('../models/CalibrationCertificate');

exports.getCertificates = asyncHandler(async (req, res) => {
  const certificates = await CalibrationCertificate.find().sort('-createdAt');
  res.json(certificates);
});

exports.createCertificate = asyncHandler(async (req, res) => {
  const { cert_id, client, truck, date_issued, expiration } = req.body;

  const certificate = await CalibrationCertificate.create({
    cert_id,
    client,
    truck,
    date_issued,
    expiration,
  });

  res.status(201).json(certificate);
});

exports.updateCertificate = asyncHandler(async (req, res) => {
  let certificate = await CalibrationCertificate.findById(req.params.id);

  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  const { cert_id, client, truck, date_issued, expiration } = req.body;

  if (cert_id) certificate.cert_id = cert_id;
  if (client) certificate.client = client;
  if (truck) certificate.truck = truck;
  if (date_issued) certificate.date_issued = date_issued;
  if (expiration) certificate.expiration = expiration;

  certificate = await certificate.save();
  res.json(certificate);
});

exports.deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await CalibrationCertificate.findByIdAndDelete(req.params.id);

  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  res.json({ message: 'Certificate removed' });
});