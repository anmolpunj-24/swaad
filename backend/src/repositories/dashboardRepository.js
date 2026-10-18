const customerModel = require("../models/customers");
const productModel = require("../models/products");
const orderModel = require("../models/orders");

const getTotalCustomersRepo = async () => {
  return await customerModel.countDocuments({
    deletedAt: null,
  });
};

const getTotalProductsRepo = async () => {
  return await productModel.countDocuments({
    deletedAt: null,
  });
};

const getTotalOrdersRepo = async () => {
  return await orderModel.countDocuments();
};

const getSalesOverviewRepo = async (startDate, endDate) => {
  return await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
        status: {
          $nin: ["cancelled", "returned"],
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        totalOrders: { $sum: 1 },
        shipped: {
          $sum: {
            $cond: [{ $eq: ["$status", "shipped"] }, 1, 0],
          },
        },
        delivered: {
          $sum: {
            $cond: [{ $eq: ["$status", "delivered"] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalOrders: 1,
        shipped: 1,
        delivered: 1,
      },
    },
  ]);
};

const getMonthlyOrdersRepo = async (startDate, endDate) => {
  const result = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: {
          $sum: {
            $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
          },
        },
        confirmed: {
          $sum: {
            $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0],
          },
        },
        processing: {
          $sum: {
            $cond: [{ $eq: ["$status", "processing"] }, 1, 0],
          },
        },
        shipped: {
          $sum: {
            $cond: [{ $eq: ["$status", "shipped"] }, 1, 0],
          },
        },
        delivered: {
          $sum: {
            $cond: [{ $eq: ["$status", "delivered"] }, 1, 0],
          },
        },
        cancelled: {
          $sum: {
            $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
          },
        },
        returned: {
          $sum: {
            $cond: [{ $eq: ["$status", "returned"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        pending: 1,
        confirmed: 1,
        processing: 1,
        shipped: 1,
        delivered: 1,
        cancelled: 1,
        returned: 1,
      },
    },
  ]);

  return (
    result[0] || {
      total: 0,
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      returned: 0,
    }
  );
};

module.exports = {
  getTotalCustomersRepo,
  getTotalProductsRepo,
  getTotalOrdersRepo,
  getSalesOverviewRepo,
  getMonthlyOrdersRepo,
};
