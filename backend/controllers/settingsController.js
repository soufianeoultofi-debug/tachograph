const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

exports.getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  
  if (!settings) {
    settings = await Settings.create({});
  }

  res.json(settings);
});

exports.updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = new Settings();
  }

  // Update all fields
  Object.keys(req.body).forEach((key) => {
    settings[key] = req.body[key];
  });

  settings = await settings.save();
  res.json(settings);
});
