const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, markRead, markAllRead, deleteNotification } = require('../controllers/notificationController');

router.route('/').get(getNotifications).post(createNotification);
router.put('/read-all', markAllRead);
router.route('/:id').delete(deleteNotification);
router.put('/:id/read', markRead);

module.exports = router;
