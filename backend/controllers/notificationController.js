const asyncHandler = require('express-async-handler');
const Notification = require('../models/Notification');

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find().sort('-createdAt');
  res.json(notifications);
});

exports.createNotification = asyncHandler(async (req, res) => {
  const { text_content, time_label, type } = req.body;

  const notification = await Notification.create({
    text_content,
    time_label: time_label || 'À l\'instant',
    type: type || 'info',
    is_read: false,
  });

  res.status(201).json(notification);
});

exports.markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  notification.is_read = true;
  await notification.save();

  res.json({ message: 'Marked as read' });
});

exports.markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({}, { is_read: true });
  res.json({ message: 'All marked as read' });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({ message: 'Notification removed' });
});
