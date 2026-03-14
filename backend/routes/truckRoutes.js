const express = require('express');
const router = express.Router();
const { getTrucks, createTruck, updateTruck, deleteTruck } = require('../controllers/truckController');

router.route('/').get(getTrucks).post(createTruck);
router.route('/:id').put(updateTruck).delete(deleteTruck);

module.exports = router;