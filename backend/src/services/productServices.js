const productRepo = require("../repositories/productRepository");

const productVariantService = require("../services/productVariantsServices");
const productVariantImagesService = require("../services/productImagesServices");
const productVariantSeoService = require("../services/productSeoService");
const productReviewsService = require("../services/productReviewsServices");

const addProductService = async (productData) => {
  if (
    !productData ||
    !productData.product ||
    !Array.isArray(productData.variants) ||
    productData.variants.length === 0
  ) {
    return {
      success: false,
      errorMessage: "Product must have at least one variant!",
    };
  }

  const checkIfCategoryExist = await productRepo.checkIfCategoryExistInDbRepo(
    productData.product.categoryId,
  );

  if (!checkIfCategoryExist) {
    return {
      success: false,
      errorMessage: "Product category not found!",
    };
  }

  const savedProduct = await productRepo.addProductRepo(
    checkIfCategoryExist._id,
    checkIfCategoryExist.name,
  );

  if (!savedProduct) {
    return {
      success: false,
      errorMessage: "Failed to create product!",
    };
  }

  for (const variantData of productData.variants) {
    const { images = [], seo = null, ...productVariantData } = variantData;

    const newVariant = await productVariantService.addProductVariantService(
      savedProduct._id,
      productVariantData,
    );

    if (!newVariant || newVariant.success === false) {
      return (
        newVariant || {
          success: false,
          errorMessage: "Failed to create product variant!",
        }
      );
    }

    for (const imageData of images) {
      const newImage = await productVariantImagesService.addProductImageService(
        savedProduct._id,
        newVariant._id,
        imageData,
      );

      if (!newImage || newImage.success === false) {
        return (
          newImage || {
            success: false,
            errorMessage: "Failed to create product image!",
          }
        );
      }
    }

    if (seo) {
      const newSeo = await productVariantSeoService.addProductSeoService(
        savedProduct._id,
        newVariant._id,
        seo,
      );

      if (!newSeo || newSeo.success === false) {
        return (
          newSeo || {
            success: false,
            errorMessage: "Failed to create product SEO!",
          }
        );
      }
    }
  }

  return savedProduct;
};

const getAllProductsService = async () => {
  const allProducts = [];

  const productData = await productRepo.allProductsInDbRepo();

  for (const product of productData) {
    const productVariants =
      await productVariantService.getAllProductVariantsService(product._id);

    if (!productVariants || productVariants.success === false) {
      return (
        productVariants || {
          success: false,
          errorMessage: "Failed to fetch product variants!",
        }
      );
    }

    const productVariant = productVariants[0];

    if (!productVariant) {
      continue;
    }

    const primaryImage =
      await productVariantImagesService.getPrimaryProductImageService(
        product._id,
        productVariant._id,
      );

    allProducts.push({
      _id: productVariant._id,
      name: productVariant.name,
      slug: productVariant.slug,
      price: productVariant.price,
      stock: productVariant.stock,
      isActive: product.isActive,
      primaryImage: primaryImage?.image || null,
      categoryName: product.categoryName,
    });
  }

  return allProducts;
};

const getOneProductService = async (productId) => {
  const productData = await productRepo.checkIfProductExistInDbRepo(productId);

  if (!productData) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const productVariants =
    await productVariantService.getAllProductVariantsService(productId);

  if (!productVariants || productVariants.success === false) {
    return (
      productVariants || {
        success: false,
        errorMessage: "Failed to fetch product variants!",
      }
    );
  }

  const seos =
    await productVariantSeoService.getAllProductSeoService(productId);

  if (!seos || seos.success === false) {
    return (
      seos || {
        success: false,
        errorMessage: "Failed to fetch product variants SEO!",
      }
    );
  }

  const variants = [];

  for (const variant of productVariants) {
    const images = await productVariantImagesService.getAllProductImagesService(
      productId,
      variant._id,
    );

    const seo = seos.find(
      (item) => item.productVariantId.toString() === variant._id.toString(),
    );

    variants.push({
      ...variant,
      images: images?.success === false ? [] : images,
      seo: seo || null,
    });
  }

  const productReviews =
    await productReviewsService.getAllProductReviewsService(productId);

  return {
    ...productData,
    variants,
    reviews: productReviews?.success === false ? [] : productReviews,
  };
};

const updateProductService = async (productId, productData) => {
  if (!productData) {
    return {
      success: false,
      errorMessage: "Product update data is required!",
    };
  }

  const existingProduct =
    await productRepo.checkIfProductExistInDbRepo(productId);

  if (!existingProduct) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  let updatedProduct = existingProduct;

  if (productData.product) {
    const productUpdateData = {};

    if (productData.product.categoryId) {
      const category = await productRepo.checkIfCategoryExistInDbRepo(
        productData.product.categoryId,
      );

      if (!category) {
        return {
          success: false,
          errorMessage: "Product category not found!",
        };
      }

      productUpdateData.categoryId = category._id;
      productUpdateData.categoryName = category.name;
    }

    if (typeof productData.product.isActive === "boolean") {
      productUpdateData.isActive = productData.product.isActive;
    }

    if (Object.keys(productUpdateData).length > 0) {
      updatedProduct = await productRepo.updateProductRepo(
        productId,
        productUpdateData,
      );
    }
  }

  if (!updatedProduct) {
    return {
      success: false,
      errorMessage: "Failed to update product!",
    };
  }

  if (Array.isArray(productData.variants)) {
    for (const variantData of productData.variants) {
      const {
        _id: productVariantId,
        images,
        seo,
        ...productVariantFields
      } = variantData;

      let variant;

      if (productVariantId) {
        variant = await productVariantService.updateProductVariantService(
          productId,
          productVariantId,
          productVariantFields,
        );
      } else {
        variant = await productVariantService.addProductVariantService(
          productId,
          productVariantFields,
        );
      }

      if (!variant || variant.success === false) {
        return (
          variant || {
            success: false,
            errorMessage: productVariantId
              ? "Failed to update product variant!"
              : "Failed to create product variant!",
          }
        );
      }

      const currentVariantId = variant._id;

      if (Array.isArray(images)) {
        for (const imageData of images) {
          const { _id: productImageId, ...imageFields } = imageData;

          let image;

          if (productImageId) {
            image = await productVariantImagesService.updateProductImageService(
              productId,
              currentVariantId,
              productImageId,
              imageFields,
            );
          } else {
            image = await productVariantImagesService.addProductImageService(
              productId,
              currentVariantId,
              imageFields,
            );
          }

          if (!image || image.success === false) {
            return (
              image || {
                success: false,
                errorMessage: productImageId
                  ? "Failed to update product image!"
                  : "Failed to create product image!",
              }
            );
          }
        }
      }

      if (seo !== undefined) {
        const { _id: productSeoId, ...seoFields } = seo;

        let seoResult;

        if (productSeoId) {
          seoResult = await productVariantSeoService.updateProductSeoService(
            productId,
            currentVariantId,
            productSeoId,
            seoFields,
          );
        } else {
          seoResult = await productVariantSeoService.addProductSeoService(
            productId,
            currentVariantId,
            seoFields,
          );
        }

        if (!seoResult || seoResult.success === false) {
          return (
            seoResult || {
              success: false,
              errorMessage: productSeoId
                ? "Failed to update product SEO!"
                : "Failed to create product SEO!",
            }
          );
        }
      }
    }
  }

  return updatedProduct;
};

const deleteProductService = async (productId) => {
  const productData = await productRepo.checkIfProductExistInDbRepo(productId);

  if (!productData) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const deletedAt = new Date();

  const deletedProduct = await productRepo.deleteProductRepo(
    productId,
    deletedAt,
  );

  await productVariantService.deleteAllProductVariantsService(
    productId,
    deletedAt,
  );

  await productVariantImagesService.deleteAllProductImagesService(
    productId,
    deletedAt,
  );

  await productVariantSeoService.deleteAllProductSeoService(
    productId,
    deletedAt,
  );

  await productReviewsService.deleteAllProductReviewsService(
    productId,
    deletedAt,
  );

  return deletedProduct;
};

module.exports = {
  addProductService,
  getAllProductsService,
  getOneProductService,
  updateProductService,
  deleteProductService,
};
