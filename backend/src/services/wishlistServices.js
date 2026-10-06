const wishlistRepo = require("../repositories/wishlistRepository");

const getCustomerWishlistService = async (customerUuid) => {
  const customerData =
    await wishlistRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const customerWishlistData =
    await wishlistRepo.getCustomerWishlistDataFromDbRepo(customerUuid);

  return customerWishlistData;
};

const addToCustomerWishlistService = async (customerUuid, wishlistData) => {
  const { productId, productVariantId } = wishlistData;

  const customerData =
    await wishlistRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const productData =
    await wishlistRepo.checkIfProductExistsInDbRepo(productId);

  if (!productData) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const productVariantData =
    await wishlistRepo.checkIfProductVariantExistsInDbRepo(
      productVariantId,
      productId,
    );

  if (!productVariantData) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const existingWishlistItem =
    await wishlistRepo.checkIfWishlistItemExistsInDbRepo(
      customerUuid,
      productId,
      productVariantId,
    );

  if (existingWishlistItem) {
    return {
      success: false,
      errorMessage: "Product already exists in wishlist!",
    };
  }

  const savedWishlistItem = await wishlistRepo.addWishlistItemInDbRepo(
    customerUuid,
    productId,
    productVariantId,
    productData.name,
    productVariantData.size,
    productVariantData.sellingPrice,
  );

  return savedWishlistItem;
};

const deleteCustomerWishlistItemService = async (
  customerUuid,
  wishlistItemId,
) => {
  const customerData =
    await wishlistRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const deletedWishlistItem = await wishlistRepo.deleteWishlistItemFromDbRepo(
    wishlistItemId,
    customerUuid,
  );

  if (!deletedWishlistItem) {
    return {
      success: false,
      errorMessage: "Wishlist item not found!",
    };
  }

  return deletedWishlistItem;
};

const clearCustomerWishlistService = async (customerUuid) => {
  const customerData =
    await wishlistRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const clearedWishlist =
    await wishlistRepo.clearCustomerWishlistFromDbRepo(customerUuid);

  return clearedWishlist;
};

module.exports = {
  getCustomerWishlistService,
  addToCustomerWishlistService,
  deleteCustomerWishlistItemService,
  clearCustomerWishlistService,
};
