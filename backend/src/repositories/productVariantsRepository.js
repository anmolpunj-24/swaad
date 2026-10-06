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
  return await productVariantModel
    .find({
      productId,
      deletedAt: null,
      isActive: true,
    })
    .select(
      "_id size unit tagLine mrp sellingPrice stock description isActive createdAt",
    )
    .sort("-createdAt")
    .lean();
};

const oneProductVariantRepo = async (productVariantId, productId) => {
  return await productVariantModel.findOne({
    _id: productVariantId,
    productId,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfSizeExistsInDbRepo = async (
  productVariantData,
  productVariantId,
) => {
  return await productVariantModel.findOne({
    size: productVariantData.size,
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
      returnDocument: "after",
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
      returnDocument: "after",
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
  checkIfSizeExistsInDbRepo,
  activeVariantsCountRepo,
  updatedProductVariantRepo,
  updateProductSeoStatus,
  updateProductImagesStatus,
  deletedProductVariantRepo,
  updateProductSeoDeletedAt,
  updateProductImagesDeletedAt,
  deleteAllProductVariantsRepo,
};
