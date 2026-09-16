const productReviewsService = require("../../services/productReviewsServices");

const addProductReview = async (req, res) => {
  const productId = req.params.productId;
  const body = req.body;

  const newProductReview = await productReviewsService.addProductReviewService(
    productId,
    body,
  );

  if (newProductReview.success === false) {
    return res.status(400).json({
      message: newProductReview.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Product review created!",
    productReview: newProductReview,
  });
};

const getAllProductReviews = async (req, res) => {
  const productId = req.params.productId;

  const allProductReviews =
    await productReviewsService.getAllProductReviewsService(productId);

  return res.status(200).json({
    message: "All product reviews fetched!",
    productReviews: allProductReviews,
  });
};

const getOneProductReview = async (req, res) => {
  const productId = req.params.productId;
  const productReviewId = req.params.id;

  const productReviewData =
    await productReviewsService.getOneProductReviewService(
      productId,
      productReviewId,
    );

  return res.status(200).json({
    message: "Product review fetched!",
    productReview: productReviewData,
  });
};

const updateProductReview = async (req, res) => {
  const productId = req.params.productId;
  const productReviewId = req.params.id;
  const body = req.body;

  const updatedProductReview =
    await productReviewsService.updateProductReviewService(
      productId,
      productReviewId,
      body,
    );

  return res.status(200).json({
    message: "Product review updated!",
    productReview: updatedProductReview,
  });
};

const deleteProductReview = async (req, res) => {
  const productId = req.params.productId;
  const productReviewId = req.params.id;

  await productReviewsService.deleteProductReviewService(
    productId,
    productReviewId,
  );

  return res.status(200).json({
    message: "Product review deleted!",
  });
};

module.exports = {
  addProductReview,
  getAllProductReviews,
  getOneProductReview,
  updateProductReview,
  deleteProductReview,
};
