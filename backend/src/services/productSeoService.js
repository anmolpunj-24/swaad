const productSeoRepo = require("../repositories/productSeoRepository");

const addProductSeoService = async (
  productId,
  productVariantId,
  productSeoData,
) => {
  const checkIfProductExist =
    await productSeoRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productSeoRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkIfSeoDataAlreadyExists =
    await productSeoRepo.checkIfSeoDataAlreadyExistsInDbRepo(
      productId,
      productVariantId,
    );

  if (checkIfSeoDataAlreadyExists) {
    return {
      success: false,
      errorMessage: "Seo data already exists for this variant!",
    };
  }

  const addSeoData = await productSeoRepo.addProductSeoRepo(
    productId,
    productVariantId,
    productSeoData,
  );

  return addSeoData;
};

const getAllProductSeoService = async (productId) => {
  const checkIfProductExist =
    await productSeoRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const allActiveVariants =
    await productSeoRepo.allActiveVariantsForProductSeoRepo(productId);

  const variantIds = allActiveVariants.map((variant) => variant._id);

  const allSeosData = await productSeoRepo.allProductSeosDataRepo(
    productId,
    variantIds,
  );

  return allSeosData;
};

const getOneProductSeoService = async (
  productId,
  productVariantId,
  productSeoId,
) => {
  const checkIfProductExist =
    await productSeoRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productSeoRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const oneSeoData = await productSeoRepo.oneSeoDataRepo(
    productSeoId,
    productId,
    productVariantId,
  );

  if (!oneSeoData) {
    return {
      success: false,
      errorMessage: "SEO data not found!",
    };
  }

  return oneSeoData;
};

const updateProductSeoService = async (
  productId,
  productVariantId,
  productSeoId,
  productSeoData,
) => {
  const checkIfProductExist =
    await productSeoRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productSeoRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkIfSeoExists =
    await productSeoRepo.checkIfSeoDataAlreadyExistsForUpdateInDbRepo(
      productSeoId,
      productId,
      productVariantId,
    );

  if (!checkIfSeoExists) {
    return {
      success: false,
      errorMessage: "Product variant seo not found!",
    };
  }

  const updatedSeoData = await productSeoRepo.updateSeoDataRepo(
    productSeoId,
    productId,
    productVariantId,
    productSeoData,
  );

  return updatedSeoData;
};

const deleteProductSeoService = async (
  productId,
  productVariantId,
  productSeoId,
) => {
  const checkIfProductExist =
    await productSeoRepo.checkIfProductExistInDbRepo(productId);

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const checkIfProductVariantExist =
    await productSeoRepo.checkIfProductVariantExistInDbRepo(
      productVariantId,
      productId,
    );

  if (!checkIfProductVariantExist) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const checkIfSeoExists =
    await productSeoRepo.checkIfSeoDataAlreadyExistsForDeleteInDbRepo(
      productSeoId,
      productId,
      productVariantId,
    );

  if (!checkIfSeoExists) {
    return {
      success: false,
      errorMessage: "Product variant seo not found!",
    };
  }

  const deletedSeoData = await productSeoRepo.deleteProductSeoRepo(
    productSeoId,
    productId,
    productVariantId,
  );

  return deletedSeoData;
};

const deleteAllProductSeoService = async (productId, deletedAt) => {
  return await productSeoRepo.deleteAllProductSeoRepo(productId, deletedAt);
};

module.exports = {
  addProductSeoService,
  getAllProductSeoService,
  getOneProductSeoService,
  updateProductSeoService,
  deleteProductSeoService,
  deleteAllProductSeoService,
};
