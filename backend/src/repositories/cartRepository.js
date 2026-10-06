const cartModel = require("../models/cart_items");
const customerModel = require("../models/customers");
const productModel = require("../models/products");
const productVariantModel = require("../models/product_variants");

const checkIfCustomerExistsInDbRepo = async (uuid) => {
  return await customerModel.findOne({
    uuid,
    isActive: true,
    deletedAt: null,
  });
};

const getCustomerCartDataFromDbRepo = async (customerUuid) => {
  return await cartModel.find({
    customerUuid,
  });
};

const checkIfProductExistsInDbRepo = async (productId) => {
  return await productModel.findOne({
    _id: productId,
    isActive: true,
    deletedAt: null,
  });
};

const checkIfProductVariantExistsInDbRepo = async (
  productVariantId,
  productId,
) => {
  return await productVariantModel.findOne({
    _id: productVariantId,
    productId,
    isActive: true,
    deletedAt: null,
  });
};

const clearCustomerCartFromDbRepo = async (customerUuid) => {
  return await cartModel.deleteMany({
    customerUuid,
  });
};

const deleteCartItemFromDbRepo = async (cartItemId, customerUuid) => {
  return await cartModel.findOneAndDelete({
    _id: cartItemId,
    customerUuid,
  });
};

const checkIfTheCartItemAlreadyExistsInDbRepo = async (
  customerUuid,
  productId,
  productVariantId,
) => {
  return await cartModel.findOne({
    customerUuid,
    productId,
    productVariantId,
  });
};

const addCartItemInDbRepo = async (
  customerUuid,
  productId,
  productVariantId,
  productName,
  variantSize,
  price,
  quantity,
) => {
  const newCartItem = new cartModel({
    customerUuid,
    productId,
    productVariantId,
    productName,
    variantSize,
    price,
    quantity,
  });

  const savedCartItem = await newCartItem.save();

  return savedCartItem;
};

const checkIfCartItemRelatedToCustomerExistsInDbRepo = async (
  cartItemId,
  customerUuid,
) => {
  return await cartModel.findOne({
    _id: cartItemId,
    customerUuid,
  });
};

const updateCartItemQuantityInDbRepo = async (cartItemId, quantity) => {
  return await cartModel.findOneAndUpdate(
    {
      _id: cartItemId,
    },
    {
      $set: {
        quantity,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

const updateCartItemInDbRepo = async (
  cartItemId,
  customerUuid,
  quantity,
  productName,
  variantSize,
  price,
) => {
  return await cartModel.findOneAndUpdate(
    {
      _id: cartItemId,
      customerUuid,
    },
    {
      $set: {
        quantity,
        productName,
        variantSize,
        price,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

module.exports = {
  checkIfCustomerExistsInDbRepo,
  getCustomerCartDataFromDbRepo,
  checkIfProductExistsInDbRepo,
  checkIfProductVariantExistsInDbRepo,
  clearCustomerCartFromDbRepo,
  deleteCartItemFromDbRepo,
  checkIfTheCartItemAlreadyExistsInDbRepo,
  addCartItemInDbRepo,
  checkIfCartItemRelatedToCustomerExistsInDbRepo,
  updateCartItemQuantityInDbRepo,
  updateCartItemInDbRepo,
};
