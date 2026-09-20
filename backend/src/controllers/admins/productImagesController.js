const productImagesService = require("../../services/productImagesServices");

const addProductImage = async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;
  const body = req.body;

  const newProductImage = await productImagesService.addProductImageService(
    productId,
    variantId,
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
  const variantId = req.params.variantId;
  const productImageId = req.params.id;

  const productImageData = await productImagesService.getOneProductImageService(
    productId,
    variantId,
    productImageId,
  );

  return res.status(200).json({
    message: "Product image fetched!",
    productImage: productImageData,
  });
};

const updateProductImage = async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;
  const productImageId = req.params.id;
  const body = req.body;

  const updatedProductImage =
    await productImagesService.updateProductImageService(
      productId,
      variantId,
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
  const variantId = req.params.variantId;
  const productImageId = req.params.id;

  await productImagesService.deleteProductImageService(
    productId,
    variantId,
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
const productService = require("../../services/productServices");

const addProduct = async (req, res) => {
  const body = req.body;
  const newProduct = await productService.addProductService(body);

  return res
    .status(201)
    .json({ message: "Product created!", product: newProduct });
};

const getAllProducts = async (req, res) => {
  const allProducts = await productService.getAllProductsService();

  return res
    .status(200)
    .json({ message: "All products fetched!", products: allProducts });
};

const getOneProduct = async (req, res) => {
  const productId = req.params.id;

  const productData = await productService.getOneProductService(productId);

  return res
    .status(200)
    .json({ message: "Product fetched!", product: productData });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const body = req.body;

  const updatedProduct = await productService.updateProductService(
    productId,
    body,
  );

  return res
    .status(200)
    .json({ message: "Product updated!", product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await productService.deleteProductService(productId);

  return res
    .status(200)
    .json({ message: "Product deleted!", product: deletedProduct });
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
