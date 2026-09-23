const productImagesModel = require("../models/product_images");
const productModel = require("../models/products");
const productVariantModel = require("../models/product_variants");

const checkIfProductExistInDbRepo = async (productId) => {
  return await productModel.findOne({
    _id: productId,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfProductVariantExistInDbRepo = async (
  productVariantId,
  productId,
) => {
  return await productVariantModel.findOne({
    _id: productVariantId,
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const checkVariantImagesCountInDbRepo = async (productId, productVariantId) => {
  return await productImagesModel.countDocuments({
    productId,
    productVariantId,
    deletedAt: null,
    isActive: true,
  });
};

const updateProductImageIsPrimaryStatusRepo = async (
  productId,
  productVariantId,
) => {
  return await productImagesModel.updateMany(
    {
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
      isPrimary: true,
    },
    {
      $set: {
        isPrimary: false,
      },
    },
  );
};

const addProductVariantImageRepo = async (
  productId,
  productVariantId,
  productImagesData,
) => {
  const addProductVariantImage = new productImagesModel({
    productId,
    productVariantId,
    ...productImagesData,
  });
  const newImagesData = await addProductVariantImage.save();
  return newImagesData;
};

const allProductVariantImagesRepo = async (productId, productVariantId) => {
  return await productImagesModel.find({
    productId,
    productVariantId,
    deletedAt: null,
    isActive: true,
  });
};

const oneProductVariantImageRepo = async (
  productImageId,
  productId,
  productVariantId,
) => {
  return await productImagesModel.findOne({
    _id: productImageId,
    productId,
    productVariantId,
    deletedAt: null,
    isActive: true,
  });
};

const updatedProductImageRepo = async (
  productImageId,
  productId,
  productVariantId,
  productImagesData,
) => {
  return await productImagesModel.findOneAndUpdate(
    {
      _id: productImageId,
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        alt: productImagesData.alt,
        isActive: productImagesData.isActive,
        isPrimary: productImagesData.isPrimary,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const updateProductImageIsPrimaryStatusForUpdateRepo = async (
  productId,
  productVariantId,
  productImageId,
) => {
  return await productImagesModel.updateMany(
    {
      productId,
      productVariantId,
      _id: { $ne: productImageId },
      deletedAt: null,
      isActive: true,
      isPrimary: true,
    },
    {
      $set: {
        isPrimary: false,
      },
    },
  );
};

const checkForNextRecentImageAndUpdateIsPrimaryStatusRepo = async (
  productId,
  productVariantId,
  productImageId,
) => {
  return await productImagesModel.findOneAndUpdate(
    {
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
      _id: { $ne: productImageId },
    },
    {
      $set: {
        isPrimary: true,
      },
    },
    {
      sort: {
        createdAt: -1,
      },
    },
  );
};

const deletedProductImageRepo = async (
  productImageId,
  productId,
  productVariantId,
) => {
  return await productImagesModel.findOneAndUpdate(
    {
      _id: productImageId,
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
        isPrimary: false,
      },
    },
    {
      new: true,
    },
  );
};

const checkForNextRecentImageAndUpdateIsPrimaryStatusFprDeleteRepo = async (
  productId,
  productVariantId,
) => {
  return await productImagesModel.findOneAndUpdate(
    {
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        isPrimary: true,
      },
    },
    {
      sort: {
        createdAt: -1,
      },
      new: true,
    },
  );
};

const getPrimaryProductImageRepo = async () => {
  return;
};

const deleteAllProductImagesRepo = async (productId, deletedAt) => {
  return await productImagesModel.updateMany(
    {
      productId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt,
        isActive: false,
        isPrimary: false,
      },
    },
  );
};

module.exports = {
  checkIfProductExistInDbRepo,
  checkIfProductVariantExistInDbRepo,
  checkVariantImagesCountInDbRepo,
  updateProductImageIsPrimaryStatusRepo,
  addProductVariantImageRepo,
  allProductVariantImagesRepo,
  oneProductVariantImageRepo,
  updatedProductImageRepo,
  updateProductImageIsPrimaryStatusForUpdateRepo,
  checkForNextRecentImageAndUpdateIsPrimaryStatusRepo,
  deletedProductImageRepo,
  checkForNextRecentImageAndUpdateIsPrimaryStatusFprDeleteRepo,
  getPrimaryProductImageRepo,
  deleteAllProductImagesRepo,
};
