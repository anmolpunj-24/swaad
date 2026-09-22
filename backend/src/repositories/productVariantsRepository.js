const productVariantModel = require("../models/product_variants");
const productModel = require("../models/products");
const productSeoModel = require("../models/product_seo");
const productImageModel = require("../models/product_images");

const checkIfProductExistInDbRepo = async (productId) => {
  return await productModel.findOne({
    _id: productId,
    deletedAt: null,
    isActive: true,
  });
};

const addProductVariantRepo = async (productId, productVariantData) => {
  const addProductVariant = new productVariantModel({
    productId,
    ...productVariantData,
  });
  const newProductVariant = await addProductVariant.save();
  return newProductVariant;
};

const allProductVariantsRepo = async (productId) => {
  return await productVariantModel.find({
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const oneProductVariantRepo = async (productVariantId, productId) => {
  return await productVariantModel.findOne({
    _id: productVariantId,
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfSlugAlreadyExistsInDbRepo = async (
  productVariantData,
  productVariantId,
) => {
  return await productVariantModel.findOne({
    slug: productVariantData.slug,
    deletedAt: null,
    _id: { $ne: productVariantId },
  });
};

const activeVariantsCountRepo = async (productId) => {
  return await productVariantModel.countDocuments({
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const updatedProductVariantRepo = async (
  productVariantId,
  productId,
  productVariantData,
) => {
  return await productVariantModel.findOneAndUpdate(
    {
      _id: productVariantId,
      productId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: productVariantData,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const updateProductSeoStatus = async (productVariantId) => {
  return await productSeoModel.updateMany(
    {
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        isActive: false,
      },
    },
  );
};

const updateProductImagesStatus = async (productVariantId) => {
  return await productImageModel.updateMany(
    {
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        isActive: false,
      },
    },
  );
};

const deletedProductVariantRepo = async (
  productVariantId,
  productId,
  deletedAt,
) => {
  return await productVariantModel.findOneAndUpdate(
    {
      _id: productVariantId,
      productId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: { deletedAt, isActive: false },
    },
    {
      new: true,
    },
  );
};

const updateProductSeoDeletedAt = async (productVariantId, deletedAt) => {
  return await productSeoModel.updateMany(
    {
      productVariantId,
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

const updateProductImagesDeletedAt = async (productVariantId, deletedAt) => {
  return await productImageModel.updateMany(
    {
      productVariantId,
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

const deleteAllProductVariantsRepo = async (productId, deletedAt) => {
  return await productVariantModel.updateMany(
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
  checkIfProductExistInDbRepo,
  addProductVariantRepo,
  allProductVariantsRepo,
  oneProductVariantRepo,
  checkIfSlugAlreadyExistsInDbRepo,
  activeVariantsCountRepo,
  updatedProductVariantRepo,
  updateProductSeoStatus,
  updateProductImagesStatus,
  deletedProductVariantRepo,
  updateProductSeoDeletedAt,
  updateProductImagesDeletedAt,
  deleteAllProductVariantsRepo,
};
