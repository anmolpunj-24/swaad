const productSeoModel = require("../models/product_seo");
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

const checkIfSeoDataAlreadyExistsInDbRepo = async (
  productId,
  productVariantId,
) => {
  return await productSeoModel.findOne({
    productId,
    productVariantId,
    deletedAt: null,
  });
};

const addProductSeoRepo = async (
  productId,
  productVariantId,
  productSeoData,
) => {
  const newSeoData = new productSeoModel({
    productId,
    productVariantId,
    ...productSeoData,
  });

  const addSeoData = await newSeoData.save();

  return addSeoData;
};

const allActiveVariantsForProductSeoRepo = async (productId) => {
  return await productVariantModel
    .find({
      productId,
      deletedAt: null,
      isActive: true,
    })
    .select("_id");
};

const allProductSeosDataRepo = async (productId, variantIds) => {
  return await productSeoModel.find({
    productId,
    productVariantId: { $in: variantIds },
    deletedAt: null,
    isActive: true,
  });
};

const oneSeoDataRepo = async (productSeoId, productId, productVariantId) => {
  return await productSeoModel.findOne({
    _id: productSeoId,
    productId,
    productVariantId,
    deletedAt: null,
    isActive: true,
  });
};

const checkIfSeoDataAlreadyExistsForUpdateInDbRepo = async (
  productSeoId,
  productId,
  productVariantId,
) => {
  return await productSeoModel.findOne({
    _id: productSeoId,
    productId,
    productVariantId,
    deletedAt: null,
  });
};

const updateSeoDataRepo = async (
  productSeoId,
  productId,
  productVariantId,
  productSeoData,
) => {
  return await productSeoModel.findOneAndUpdate(
    {
      _id: productSeoId,
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    { $set: productSeoData },
    {
      new: true,
      runValidators: true,
    },
  );
};

const checkIfSeoDataAlreadyExistsForDeleteInDbRepo = async (
  productSeoId,
  productId,
  productVariantId,
) => {
  return await productSeoModel.findOne({
    _id: productSeoId,
    productId,
    productVariantId,
    deletedAt: null,
    isActive: true,
  });
};

const deleteProductSeoRepo = async (
  productSeoId,
  productId,
  productVariantId,
) => {
  return await productSeoModel.findOneAndUpdate(
    {
      _id: productSeoId,
      productId,
      productVariantId,
      deletedAt: null,
      isActive: true,
    },
    { $set: { deletedAt: new Date(), isActive: false } },
    {
      new: true,
    },
  );
};

const deleteAllProductSeoRepo = async (productId, deletedAt) => {
  return await productSeoModel.updateMany(
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
  checkIfProductVariantExistInDbRepo,
  checkIfSeoDataAlreadyExistsInDbRepo,
  addProductSeoRepo,
  allActiveVariantsForProductSeoRepo,
  allProductSeosDataRepo,
  oneSeoDataRepo,
  checkIfSeoDataAlreadyExistsForUpdateInDbRepo,
  updateSeoDataRepo,
  checkIfSeoDataAlreadyExistsForDeleteInDbRepo,
  deleteProductSeoRepo,
  deleteAllProductSeoRepo,
};
