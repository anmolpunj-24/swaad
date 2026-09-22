const productReviewsModel = require("../models/product_reviews");
const productModel = require("../models/products");
const customerModel = require("../models/customers");

const checkIfProductExistsInDbRepo = async (productId) => {
  return await productModel.findOne({
    _id: productId,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfCustomerExistInDbRepo = async (customerUuid) => {
  return await customerModel.findOne({
    uuid: customerUuid,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfReviewAlreadyExistsInDbRepo = async (productId, customerUuid) => {
  return await productReviewsModel.findOne({
    productId,
    customerUuid,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfCustomerReviewExistsInDbRepo = async (
  productReviewId,
  productId,
  customerUuid,
) => {
  return await productReviewsModel.findOne({
    _id: productReviewId,
    productId,
    customerUuid,
    deletedAt: null,
    isActive: true,
  });
};

const addReviewRepo = async (productId, customerUuid, productReviewData) => {
  const reviewData = new productReviewsModel({
    productId,
    customerUuid,
    rating: productReviewData.rating,
    description: productReviewData.description,
    customerName: productReviewData.customerName,
    customerCity: productReviewData.customerCity,
  });

  const addedReviewData = await reviewData.save();
  return addedReviewData;
};

const getAllReviewsDataRepo = async (productId) => {
  return await productReviewsModel.find({
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const getOneReviewDataRepo = async (productReviewId, productId) => {
  return await productReviewsModel.findOne({
    _id: productReviewId,
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const updateReviewDataRepo = async (
  productReviewId,
  productId,
  customerUuid,
  productReviewData,
) => {
  return await productReviewsModel.findOneAndUpdate(
    {
      _id: productReviewId,
      productId,
      customerUuid,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        rating: productReviewData.rating,
        description: productReviewData.description,
        customerName: productReviewData.customerName,
        customerCity: productReviewData.customerCity,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteReviewDataRepo = async (
  productReviewId,
  productId,
  customerUuid,
) => {
  return await productReviewsModel.findOneAndUpdate(
    {
      _id: productReviewId,
      productId,
      customerUuid,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
    { new: true },
  );
};

const deleteAllProductReviewsRepo = async (productId, deletedAt) => {
  return await productReviewsModel.updateMany(
    {
      productId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt,
        isActive: false,
      },
    },
  );
};

module.exports = {
  checkIfProductExistsInDbRepo,
  checkIfCustomerExistInDbRepo,
  checkIfReviewAlreadyExistsInDbRepo,
  checkIfCustomerReviewExistsInDbRepo,
  addReviewRepo,
  getAllReviewsDataRepo,
  getOneReviewDataRepo,
  updateReviewDataRepo,
  deleteReviewDataRepo,
  deleteAllProductReviewsRepo,
};
