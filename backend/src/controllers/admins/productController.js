const productService = require("../../services/productServices");

const addProduct = async (req, res) => {
  const newProduct = await productService.addProductService(req.body);

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

  if (!productId) {
    return res.status(400).json({ message: "Product id not found!" });
  }

  const productData = await productService.getOneProductService(productId);

  return res
    .status(200)
    .json({ message: "Product fetched!", product: productData });
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const body = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product id not found!" });
  }

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

  if (!productId) {
    return res.status(400).json({ message: "Product id not found!" });
  }

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
