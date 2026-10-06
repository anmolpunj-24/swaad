const wishlistItemsModel = require("../models/wishlist_items");
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

const getCustomerWishlistDataFromDbRepo = async (customerUuid) => {
  return await wishlistItemsModel.find({
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

const checkIfWishlistItemExistsInDbRepo = async (
  customerUuid,
  productId,
  productVariantId,
) => {
  return await wishlistItemsModel.findOne({
    customerUuid,
    productId,
    productVariantId,
  });
};

const addWishlistItemInDbRepo = async (
  customerUuid,
  productId,
  productVariantId,
  productName,
  variantSize,
  price,
) => {
  const newWishlistItem = new wishlistItemsModel({
    customerUuid,
    productId,
    productVariantId,
    productName,
    variantSize,
    price,
  });

  const savedWishlistItem = await newWishlistItem.save();

  return savedWishlistItem;
};

const deleteWishlistItemFromDbRepo = async (
  wishlistItemId,
  customerUuid,
) => {
  return await wishlistItemsModel.findOneAndDelete({
    _id: wishlistItemId,
    customerUuid,
  });
};

const clearCustomerWishlistFromDbRepo = async (customerUuid) => {
  return await wishlistItemsModel.deleteMany({
    customerUuid,
  });
};

module.exports = {
  checkIfCustomerExistsInDbRepo,
  getCustomerWishlistDataFromDbRepo,
  checkIfProductExistsInDbRepo,
  checkIfProductVariantExistsInDbRepo,
  checkIfWishlistItemExistsInDbRepo,
  addWishlistItemInDbRepo,
  deleteWishlistItemFromDbRepo,
  clearCustomerWishlistFromDbRepo,
};