const productImagesService = require("../../services/productImagesServices");

const addProductImage = async (req, res) => {
  const productId = req.params.productId;
  const body = req.body;

  const newProductImage = await productImagesService.addProductImageService(
    productId,
    body,
  );

  if (newProductImage.success === false) {
    return res.status(400).json({
      message: newProductImage.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Product image created!",
    productImage: newProductImage,
  });
};

const getAllProductImages = async (req, res) => {
  const productId = req.params.productId;

  const allProductImages =
    await productImagesService.getAllProductImagesService(productId);

  return res.status(200).json({
    message: "All product images fetched!",
    productImages: allProductImages,
  });
};

const getOneProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productImageId = req.params.id;

  const productImageData = await productImagesService.getOneProductImageService(
    productId,
    productImageId,
  );

  return res.status(200).json({
    message: "Product image fetched!",
    productImage: productImageData,
  });
};

const updateProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productImageId = req.params.id;
  const body = req.body;

  const updatedProductImage =
    await productImagesService.updateProductImageService(
      productId,
      productImageId,
      body,
    );

  return res.status(200).json({
    message: "Product image updated!",
    productImage: updatedProductImage,
  });
};

const deleteProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productImageId = req.params.id;

  await productImagesService.deleteProductImageService(
    productId,
    productImageId,
  );

  return res.status(200).json({
    message: "Product image deleted!",
  });
};

module.exports = {
  addProductImage,
  getAllProductImages,
  getOneProductImage,
  updateProductImage,
  deleteProductImage,
};
