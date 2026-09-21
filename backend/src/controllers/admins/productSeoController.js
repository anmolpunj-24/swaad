const productSeoService = require("../../services/productSeoService");

const addProductSeo = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const body = req.body;

  const newProductSeo = await productSeoService.addProductSeoService(
    productId,
    productVariantId,
    body,
  );

  if (newProductSeo.success === false) {
    return res.status(400).json({
      message: newProductSeo.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Product seo created!",
    productSeo: newProductSeo,
  });
};

const getAllProductSeos = async (req, res) => {
  const productId = req.params.productId;

  const allProductSeos =
    await productSeoService.getAllProductSeoService(productId);

  return res.status(200).json({
    message: "All product seo fetched!",
    productSeos: allProductSeos,
  });
};

const getOneProductSeo = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productSeoId = req.params.id;

  const productSeoData = await productSeoService.getOneProductSeoService(
    productId,
    productVariantId,
    productSeoId,
  );

  return res.status(200).json({
    message: "Product seo fetched!",
    productSeo: productSeoData,
  });
};

const updateProductSeo = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productSeoId = req.params.id;
  const body = req.body;

  const updatedProductSeo = await productSeoService.updateProductSeoService(
    productId,
    productVariantId,
    productSeoId,
    body,
  );

  return res.status(200).json({
    message: "Product seo updated!",
    productSeo: updatedProductSeo,
  });
};

const deleteProductSeo = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productSeoId = req.params.id;

  await productSeoService.deleteProductSeoService(
    productId,
    productVariantId,
    productSeoId,
  );

  return res.status(200).json({
    message: "Product seo deleted!",
  });
};

module.exports = {
  addProductSeo,
  getAllProductSeos,
  getOneProductSeo,
  updateProductSeo,
  deleteProductSeo,
};
