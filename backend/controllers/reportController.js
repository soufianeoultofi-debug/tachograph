const asyncHandler = require('express-async-handler');
const Invoice = require('../models/Invoice');
const WorkOrder = require('../models/WorkOrder');

exports.getReports = asyncHandler(async (req, res) => {
  // Total revenue
  const revResult = await Invoice.aggregate([
    { $group: { _id: null, revenue: { $sum: '$montant' } } },
  ]);
  const totalRevenue = revResult.length > 0 ? revResult[0].revenue : 0;

  // Total repairs
  const totalRepairs = await WorkOrder.countDocuments();

  // Monthly stats
  const monthlyStats = await WorkOrder.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Status counts
  const statusCounts = await WorkOrder.aggregate([
    {
      $group: {
        _id: '$statut',
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    totalRevenue,
    totalRepairs,
    monthlyStats,
    statusCounts,
  });
});