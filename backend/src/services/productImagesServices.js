const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const productImagesRepo = require("../repositories/productImagesRepository");

const addProductImageService = async (
  productId,
  productVariantId,
  productImagesData,
  file,
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

  if (!file) {
    return {
      success: false,
      errorMessage: "Image file is required!",
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

  const productDirectory = path.join(
    process.cwd(),
    "uploads",
    "products",
    productId.toString(),
    productVariantId.toString(),
  );

  fs.mkdirSync(productDirectory, { recursive: true });

  const originalName = path
    .parse(file.originalname)
    .name.replace(/[^a-zA-Z0-9-_]/g, "-");

  const fileName = `${Date.now()}-${originalName}.webp`;

  const filePath = path.join(productDirectory, fileName);

  try {
    await sharp(file.buffer)
      .webp({
        quality: 80,
      })
      .toFile(filePath);

    productImagesData.image = fileName;

    const newImagesData = await productImagesRepo.addProductVariantImageRepo(
      productId,
      productVariantId,
      productImagesData,
    );

    return newImagesData;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

const getAllProductImagesService = async (productId, productVariantId) => {
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

  const allProductVariantImages =
    await productImagesRepo.allProductVariantImagesRepo(
      productId,
      productVariantId,
    );

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

  const wasPrimary = checkIfProductVariantImageExist.isPrimary;

  const deletedProductImage = await productImagesRepo.deletedProductImageRepo(
    productImageId,
    productId,
    productVariantId,
  );

  if (!deletedProductImage) {
    return {
      success: false,
      errorMessage: "Failed to delete product image!",
    };
  }

  if (wasPrimary) {
    await productImagesRepo.checkForNextRecentImageAndUpdateIsPrimaryStatusForDeleteRepo(
      productId,
      productVariantId,
    );
  }

  return deletedProductImage;
};

const getPrimaryProductImageService = async (productId, productVariantId) => {
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

  const primaryImage = await productImagesRepo.getPrimaryProductImageRepo(
    productId,
    productVariantId,
  );

  return primaryImage;
};

const deleteAllProductImagesService = async (productId, deletedAt) => {
  return await productImagesRepo.deleteAllProductImagesRepo(
    productId,
    deletedAt,
  );
};

module.exports = {
  addProductImageService,
  getAllProductImagesService,
  getOneProductImageService,
  updateProductImageService,
  deleteProductImageService,
  getPrimaryProductImageService,
  deleteAllProductImagesService,
};
