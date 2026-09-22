const productVariantRepo = require("../repositories/productVariantsRepository");

const addProductVariantService = async (productId, productVariantData) => {
  const checkIfProductExist =
    await productVariantRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const newProductVariant = await productVariantRepo.addProductVariantRepo(
    productId,
    productVariantData,
  );
  return newProductVariant;
};

const getAllProductVariantsService = async (productId) => {
  const checkIfProductExist =
    await productVariantRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const allProductVariants =
    await productVariantRepo.allProductVariantsRepo(productId);

  return allProductVariants;
};

const getOneProductVariantService = async (productId, productVariantId) => {
  const checkIfProductExist =
    await productVariantRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const oneProductVariantData = await productVariantRepo.oneProductVariantRepo(
    productVariantId,
    productId,
  );

  if (!oneProductVariantData) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  return oneProductVariantData;
};

const updateProductVariantService = async (
  productId,
  productVariantId,
  productVariantData,
) => {
  const checkIfProductExist =
    await productVariantRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productVariantRepo.oneProductVariantRepo(productVariantId, productId);

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  if (
    productVariantData.slug &&
    productVariantData.slug !== checkIfProductVariantExist.slug
  ) {
    const checkIfSlugAlreadyExists =
      await productVariantRepo.checkIfSlugAlreadyExistsInDbRepo(
        productVariantData,
        productVariantId,
      );

    if (checkIfSlugAlreadyExists) {
      return {
        success: false,
        errorMessage: "Product variant slug already exists!",
      };
    }
  }

  const isDeactivatingVariant =
    checkIfProductVariantExist.isActive === true &&
    productVariantData.isActive === false;

  if (isDeactivatingVariant) {
    const activeVariantsCount =
      await productVariantRepo.activeVariantsCountRepo(productId);

    if (activeVariantsCount === 1) {
      return {
        success: false,
        errorMessage: "Product must have at least one active variant!",
      };
    }
  }

  const updatedProductVariant =
    await productVariantRepo.updatedProductVariantRepo(
      productVariantId,
      productId,
      productVariantData,
    );

  if (!updatedProductVariant) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  if (isDeactivatingVariant) {
    await productVariantRepo.updateProductSeoStatus(productVariantId);
    await productVariantRepo.updateProductImagesStatus(productVariantId);
  }

  return updatedProductVariant;
};

const deleteProductVariantService = async (productId, productVariantId) => {
  const checkIfProductExist =
    await productVariantRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productVariantRepo.oneProductVariantRepo(productVariantId, productId);
  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const activeVariantsCount =
    await productVariantRepo.activeVariantsCountRepo(productId);

  if (activeVariantsCount === 1) {
    return {
      success: false,
      errorMessage: "Product must have at least one active variant!",
    };
  }

  const deletedAt = new Date();

  const deletedProductVariant =
    await productVariantRepo.deletedProductVariantRepo(
      productVariantId,
      productId,
      deletedAt,
    );

  if (!deletedProductVariant) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  await productVariantRepo.updateProductSeoDeletedAt(
    productVariantId,
    deletedAt,
  );
  await productVariantRepo.updateProductImagesDeletedAt(
    productVariantId,
    deletedAt,
  );

  return deletedProductVariant;
};

const deleteAllProductVariantsService = async (productId, deletedAt) => {
  return await productVariantRepo.deleteAllProductVariantsRepo(
    productId,
    deletedAt,
  );
};

module.exports = {
  addProductVariantService,
  getAllProductVariantsService,
  getOneProductVariantService,
  updateProductVariantService,
  deleteProductVariantService,
  deleteAllProductVariantsService,
};
