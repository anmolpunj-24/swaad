const productService = require("../../services/productServices");

const addProduct = async (req, res) => {
  const body = req.body;
  const newProduct = await productService.addProductService(body);

  if (newProduct.success === false) {
    return res.status(400).json({
      message: newProduct.errorMessage,
    });
  }

  return res
    .status(201)
    .json({ message: "Product created!", product: newProduct });
};

const getAllProducts = async (req, res) => {
  const allProducts = await productService.getAllProductsService();

  if (allProducts.success === false) {
    return res.status(400).json({
      message: allProducts.errorMessage,
    });
  }

  return res
    .status(200)
    .json({ message: "All products fetched!", products: allProducts });
};

const getOneProduct = async (req, res) => {
  const productId = req.params.id;

  const productData = await productService.getOneProductService(productId);

  if (productData.success === false) {
    return res.status(400).json({
      message: productData.errorMessage,
    });
  }

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

  if (updatedProduct.success === false) {
    return res.status(400).json({
      message: updatedProduct.errorMessage,
    });
  }

  return res
    .status(200)
    .json({ message: "Product updated!", product: updatedProduct });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await productService.deleteProductService(productId);

  if (deletedProduct.success === false) {
    return res.status(400).json({
      message: deletedProduct.errorMessage,
    });
  }

  return res.status(200).json({ message: "Product deleted!" });
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
