const express = require('express');
const router = express.Router();
const { getWorkOrders, createWorkOrder, updateWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');

router.route('/').get(getWorkOrders).post(createWorkOrder);
router.route('/:id').put(updateWorkOrder).delete(deleteWorkOrder);

module.exports = router;