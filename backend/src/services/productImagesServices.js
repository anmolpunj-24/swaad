const productImagesRepo = require("../repositories/productImagesRepository");

const addProductImageService = async (
  productId,
  productVariantId,
  productImagesData,
) => {
  const checkIfProductExist =
    await productImagesRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productImagesRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkVariantImagesCount =
    await productImagesRepo.checkVariantImagesCountInDbRepo(
      productId,
      productVariantId,
    );

  if (checkVariantImagesCount >= 5) {
    return {
      success: false,
      errorMessage: "Only 5 images per variant allowed!",
    };
  }

  const isFirstImage = checkVariantImagesCount === 0;

  if (isFirstImage) {
    productImagesData.isPrimary = true;
  }

  if (!isFirstImage && productImagesData.isPrimary === true) {
    await productImagesRepo.updateProductImageIsPrimaryStatusRepo(
      productId,
      productVariantId,
    );
  }

  const newImagesData = await productImagesRepo.addProductVariantImageRepo(
    productId,
    productVariantId,
    productImagesData,
  );
  return newImagesData;
};

const getAllProductImagesService = async (productId) => {
  const checkIfProductExist =
    await productImagesRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const allProductVariantImages =
    await productImagesRepo.allProductVariantImagesRepo(productId);

  return allProductVariantImages;
};

const getOneProductImageService = async (
  productId,
  productVariantId,
  productImageId,
) => {
  const checkIfProductExist =
    await productImagesRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productImagesRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const oneProductVariantImage =
    await productImagesRepo.oneProductVariantImageRepo(
      productImageId,
      productId,
      productVariantId,
    );

  if (!oneProductVariantImage) {
    return {
      success: false,
      errorMessage: "Product variant image not found!",
    };
  }

  return oneProductVariantImage;
};

const updateProductImageService = async (
  productId,
  productVariantId,
  productImageId,
  productImagesData,
) => {
  const checkIfProductExist =
    await productImagesRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productImagesRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkIfProductImageExist =
    await productImagesRepo.oneProductVariantImageRepo(
      productImageId,
      productId,
      productVariantId,
    );

  if (!checkIfProductImageExist) {
    return {
      success: false,
      errorMessage: "Product variant image not found!",
    };
  }

  if (productImagesData.isActive === false) {
    productImagesData.isPrimary = false;
  }

  const updatedProductImage = await productImagesRepo.updatedProductImageRepo(
    productImageId,
    productId,
    productVariantId,
    productImagesData,
  );

  if (!updatedProductImage) {
    return {
      success: false,
      errorMessage: "Product variant image not found!",
    };
  }

  if (productImagesData.isPrimary === true) {
    await productImagesRepo.updateProductImageIsPrimaryStatusForUpdateRepo(
      productId,
      productVariantId,
      productImageId,
    );
  }

  if (productImagesData.isActive === false) {
    const activeImagesCount =
      await productImagesRepo.checkVariantImagesCountInDbRepo(
        productId,
        productVariantId,
      );

    if (activeImagesCount === 0) {
      return updatedProductImage;
    }

    if (checkIfProductImageExist.isPrimary === true) {
      await productImagesRepo.checkForNextRecentImageAndUpdateIsPrimaryStatusRepo(
        productId,
        productVariantId,
        productImageId,
      );
    }
  }

  return updatedProductImage;
};

const deleteProductImageService = async (
  productId,
  productVariantId,
  productImageId,
) => {
  const checkIfProductExist =
    await productImagesRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productImagesRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkIfProductVariantImageExist =
    await productImagesRepo.oneProductVariantImageRepo(
      productImageId,
      productId,
      productVariantId,
    );

  if (!checkIfProductVariantImageExist) {
    return {
      success: false,
      errorMessage: "Product variant image not found!",
    };
  }

  const checkVariantImagesCount =
    await productImagesRepo.checkVariantImagesCountInDbRepo(
      productId,
      productVariantId,
    );

  const isDeletingPrimary = checkIfProductVariantImageExist.isPrimary === true;

  const deletedProductImage = await productImagesRepo.deletedProductImageRepo(
    productImageId,
    productId,
    productVariantId,
  );

  if (!deletedProductImage) {
    return {
      success: false,
      errorMessage: "Product variant image not found!",
    };
  }

  if (isDeletingPrimary && checkVariantImagesCount > 1) {
    await productImagesRepo.checkForNextRecentImageAndUpdateIsPrimaryStatusFprDeleteRepo(
      productId,
      productVariantId,
    );
  }

  return deletedProductImage;
};

module.exports = {
  addProductImageService,
  getAllProductImagesService,
  getOneProductImageService,
  updateProductImageService,
  deleteProductImageService,
};
