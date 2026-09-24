const ordersModel = require("../models/orders");
const orderItemModel = require("../models/order_items");
const productModel = require("../models/products");
const productVariantModel = require("../models/product_variants");

const checkIfOrderExistInDbRepo = async (orderId) => {
  return await ordersModel
    .findOne({
      _id: orderId,
    })
    .select("_id")
    .lean();
};

const checkIfProductExistInDbRepo = async (productId) => {
  return await productModel
    .findOne({
      _id: productId,
      isActive: true,
      deletedAt: null,
    })
    .select("_id")
    .lean();
};

const checkIfProductVariantExistInDbRepo = async (
  productVariantId,
  productId,
) => {
  return await productVariantModel
    .findOne({
      _id: productVariantId,
      productId,
      deletedAt: null,
      isActive: true,
    })
    .select("_id")
    .lean();
};

const addCustomerOrderItemRepo = async (newOrderItemData) => {
  const addOrderItem = new orderItemModel(newOrderItemData);
  const orderItemData = await addOrderItem.save();
  return orderItemData;
};

const getAllCustomerOrderItemsRepo = async (orderId) => {
  return await orderItemModel
    .find({
      orderId,
    })
    .select("-updatedAt")
    .sort("-createdAt")
    .lean();
};

const checkIfOneOrderItemExistInDbRepo = async (orderItemId, orderId) => {
  return await orderItemModel
    .findOne({
      _id: orderItemId,
      orderId,
    })
    .select("-updatedAt")
    .lean();
};

const updateCustomerOrderItemRepo = async (
  orderItemId,
  orderId,
  orderItemData,
) => {
  return orderItemModel.findOneAndUpdate(
    {
      _id: orderItemId,
      orderId,
    },
    { $set: orderItemData },
    { new: true },
  );
};

module.exports = {
  checkIfOrderExistInDbRepo,
  checkIfProductExistInDbRepo,
  checkIfProductVariantExistInDbRepo,
  addCustomerOrderItemRepo,
  getAllCustomerOrderItemsRepo,
  checkIfOneOrderItemExistInDbRepo,
  updateCustomerOrderItemRepo,
};
