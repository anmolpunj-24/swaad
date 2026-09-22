const productImagesService = require("../../services/productImagesServices");

const addProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const body = req.body;

  const newProductImage = await productImagesService.addProductImageService(
    productId,
    productVariantId,
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

  if (allProductImages.success === false) {
    return res.status(400).json({
      message: allProductImages.errorMessage,
    });
  }

  return res.status(200).json({
    message: "All product images fetched!",
    productImages: allProductImages,
  });
};

const getOneProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productImageId = req.params.id;

  const productImageData = await productImagesService.getOneProductImageService(
    productId,
    productVariantId,
    productImageId,
  );

  if (productImageData.success === false) {
    return res.status(400).json({
      message: productImageData.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Product image fetched!",
    productImage: productImageData,
  });
};

const updateProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productImageId = req.params.id;
  const body = req.body;

  const updatedProductImage =
    await productImagesService.updateProductImageService(
      productId,
      productVariantId,
      productImageId,
      body,
    );

  if (updatedProductImage.success === false) {
    return res.status(400).json({
      message: updatedProductImage.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Product image updated!",
    productImage: updatedProductImage,
  });
};

const deleteProductImage = async (req, res) => {
  const productId = req.params.productId;
  const productVariantId = req.params.variantId;
  const productImageId = req.params.id;

  const deletedProductImage =
    await productImagesService.deleteProductImageService(
      productId,
      productVariantId,
      productImageId,
    );

  if (deletedProductImage.success === false) {
    return res.status(400).json({
      message: deletedProductImage.errorMessage,
    });
  }

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
