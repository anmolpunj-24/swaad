const customerModel = require("../models/customers");
const ordersModel = require("../models/orders");
const orderItemModel = require("../models/order_items");
const productModel = require("../models/products");
const productVariantModel = require("../models/product_variants");

const checkIfCustomerExistInDbRepo = async (customerUuid) => {
  return await customerModel
    .findOne({
      uuid: customerUuid,
      deletedAt: null,
      isActive: true,
    })
    .select("_id")
    .lean();
};

const addCustomerOrderRepo = async (customerUuid, orderData) => {
  const newOrderData = new ordersModel({ customerUuid, ...orderData });
  const newOrder = await newOrderData.save();
  return newOrder;
};

const addMultipleOrderItemsRepo = async (orderItemsData) => {
  return await orderItemModel.insertMany(orderItemsData);
};

const getAllCustomerOrdersRepo = async (customerUuid) => {
  return await ordersModel
    .find({
      customerUuid,
    })
    .sort("-createdAt")
    .lean();
};

const getAllOrdersRepo = async () => {
  return await ordersModel
    .find({})
    .select("-updatedAt")
    .sort("-createdAt")
    .populate({
      path: "customer",
      select: "uuid userId",
      populate: {
        path: "userId",
        select: "email",
      },
    })
    .lean();
};

const checkIfOrderExistInDbRepo = async (orderId, customerUuid) => {
  return await ordersModel
    .findOne({
      _id: orderId,
      customerUuid,
    })
    .select("-updatedAt")
    .lean();
};

const checkIfAvailableOrderExistInDbRepo = async (orderId) => {
  const order = await ordersModel
    .findOne({ _id: orderId })
    .populate({
      path: "customer",
      select: "uuid userId",
      populate: {
        path: "userId",
        select: "email",
      },
    })
    .lean();

  if (!order) return null;

  const orderItems = await orderItemModel
    .find({ orderId: order._id })
    .sort("-createdAt")
    .lean();

  const enrichedOrderItems = await Promise.all(
    orderItems.map(async (item) => {
      const [product, variant] = await Promise.all([
        productModel.findById(item.productId).select("name").lean(),
        productVariantModel
          .findById(item.productVariantId)
          .select("size unit")
          .lean(),
      ]);

      const variantLabel = variant
        ? `${variant.size} ${variant.unit || "g"}`
        : item.productVariantName || "Variant unavailable";

      return {
        ...item,
        productName: product?.name || "Product unavailable",
        productVariantName: variantLabel,
      };
    }),
  );

  return {
    ...order,
    orderItems: enrichedOrderItems,
  };
};

const updateCustomerOrderRepo = async (customerUuid, orderId, orderData) => {
  return await ordersModel.findOneAndUpdate(
    { customerUuid, _id: orderId },
    { $set: orderData },
    { returnDocument: "after", runValidators: true },
  );
};

module.exports = {
  checkIfCustomerExistInDbRepo,
  addCustomerOrderRepo,
  getAllCustomerOrdersRepo,
  checkIfOrderExistInDbRepo,
  updateCustomerOrderRepo,
  getAllOrdersRepo,
  checkIfAvailableOrderExistInDbRepo,
  addMultipleOrderItemsRepo,
};
