const productVariantsService = require("../../services/productVariantsServices");

const addProductVariant = async (req, res) => {
  const productId = req.params.productId;
  const body = req.body;

  const newProductVariant =
    await productVariantsService.addProductVariantService(productId, body);

  if (newProductVariant.success === false) {
    return res.status(400).json({
      message: newProductVariant.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Product variant created!",
    productVariant: newProductVariant,
  });
};

const getAllProductVariants = async (req, res) => {
  const productId = req.params.productId;

  const allProductVariants =
    await productVariantsService.getAllProductVariantsService(productId);

  if (allProductVariants.success === false) {
    return res.status(400).json({
      message: allProductVariants.errorMessage,
    });
  }

  return res.status(200).json({
    message: "All product variants fetched!",
    productVariants: allProductVariants,
  });
};

const getOneProductVariant = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.id;

  const productVariantData =
    await productVariantsService.getOneProductVariantService(
      productId,
      productVariantId,
    );

  if (productVariantData.success === false) {
    return res.status(400).json({
      message: productVariantData.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Product variant fetched!",
    productVariant: productVariantData,
  });
};

const updateProductVariant = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.id;
  const body = req.body;

  const updatedProductVariant =
    await productVariantsService.updateProductVariantService(
      productId,
      productVariantId,
      body,
    );

  if (updatedProductVariant.success === false) {
    return res.status(400).json({
      message: updatedProductVariant.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Product variant updated!",
    productVariant: updatedProductVariant,
  });
};

const deleteProductVariant = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.id;

  const deletedVariant =
    await productVariantsService.deleteProductVariantService(
      productId,
      productVariantId,
    );

  if (deletedVariant.success === false) {
    return res.status(400).json({
      message: deletedVariant.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Product variant deleted!",
  });
};

module.exports = {
  addProductVariant,
  getAllProductVariants,
  getOneProductVariant,
  updateProductVariant,
  deleteProductVariant,
};
