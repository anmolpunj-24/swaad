const productReviewRepo = require("../repositories/productReviewsRepository");

const addProductReviewService = async (
  productId,
  customerUuid,
  productReviewData,
) => {
  const checkIfProductExist =
    await productReviewRepo.checkIfProductExistsInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfCustomerExist =
    await productReviewRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const checkIfExistingReview =
    await productReviewRepo.checkIfReviewAlreadyExistsInDbRepo(
      productId,
      customerUuid,
    );

  if (checkIfExistingReview) {
    return {
      success: false,
      errorMessage: "You have already reviewed this product!",
    };
  }

  const reviewData = await productReviewRepo.addReviewRepo(
    productId,
    customerUuid,
    productReviewData,
  );
  return reviewData;
};

const getAllProductReviewsService = async (productId) => {
  const checkIfProductExist =
    await productReviewRepo.checkIfProductExistsInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const allReviewsData =
    await productReviewRepo.getAllReviewsDataRepo(productId);
  return allReviewsData;
};

const getOneProductReviewService = async (productId, productReviewId) => {
  const checkIfProductExist =
    await productReviewRepo.checkIfProductExistsInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const oneReviewData = await productReviewRepo.getOneReviewDataRepo(
    productReviewId,
    productId,
  );

  if (!oneReviewData) {
    return {
      success: false,
      errorMessage: "Review not found!",
    };
  }

  return oneReviewData;
};

const updateProductReviewService = async (
  productId,
  productReviewId,
  customerUuid,
  productReviewData,
) => {
  const checkIfProductExist =
    await productReviewRepo.checkIfProductExistsInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfReviewExist =
    await productReviewRepo.checkIfCustomerReviewExistsInDbRepo(
      productReviewId,
      productId,
      customerUuid,
    );

  if (!checkIfReviewExist) {
    return {
      success: false,
      errorMessage: "Review not found!",
    };
  }

  const updatedReviewData = await productReviewRepo.updateReviewDataRepo(
    productReviewId,
    productId,
    customerUuid,
    productReviewData,
  );

  return updatedReviewData;
};

const deleteProductReviewService = async (
  productId,
  productReviewId,
  customerUuid,
) => {
  const checkIfProductExist =
    await productReviewRepo.checkIfProductExistsInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfReviewExist =
    await productReviewRepo.checkIfCustomerReviewExistsInDbRepo(
      productReviewId,
      productId,
      customerUuid,
    );

  if (!checkIfReviewExist) {
    return {
      success: false,
      errorMessage: "Review not found!",
    };
  }

  const deletedReview = await productReviewRepo.deleteReviewDataRepo(
    productReviewId,
    productId,
    customerUuid,
  );

  return deletedReview;
};

const deleteAllProductReviewsService = async (productId, deletedAt) => {
  return await productReviewRepo.deleteAllProductReviewsRepo(
    productId,
    deletedAt,
  );
};

module.exports = {
  addProductReviewService,
  getAllProductReviewsService,
  getOneProductReviewService,
  updateProductReviewService,
  deleteProductReviewService,
  deleteAllProductReviewsService,
};
