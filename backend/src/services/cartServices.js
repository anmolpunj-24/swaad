const cartRepo = require("../repositories/cartRepository");

const getCustomerCartService = async (customerUuid) => {
  const customerData =
    await cartRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const customerCartData =
    await cartRepo.getCustomerCartDataFromDbRepo(customerUuid);

  return customerCartData;
};

const addToCustomerCartService = async (customerUuid, cartData) => {
  const { productId, productVariantId, quantity } = cartData;

  const customerData =
    await cartRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const productData = await cartRepo.checkIfProductExistsInDbRepo(productId);

  if (!productData) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  const productVariantData = await cartRepo.checkIfProductVariantExistsInDbRepo(
    productVariantId,
    productId,
  );

  if (!productVariantData) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      success: false,
      errorMessage: "Quantity must be at least 1!",
    };
  }

  const existingCartItem =
    await cartRepo.checkIfTheCartItemAlreadyExistsInDbRepo(
      customerUuid,
      productId,
      productVariantId,
    );

  const finalQuantity = existingCartItem
    ? existingCartItem.quantity + quantity
    : quantity;

  if (finalQuantity > productVariantData.stock) {
    return {
      success: false,
      errorMessage: `Only ${productVariantData.stock} item(s) available in stock!`,
    };
  }

  if (existingCartItem) {
    const updatedCartItem = await cartRepo.updateCartItemQuantityInDbRepo(
      existingCartItem._id,
      finalQuantity,
    );

    return updatedCartItem;
  }

  const savedCartItem = await cartRepo.addCartItemInDbRepo(
    customerUuid,
    productId,
    productVariantId,
    productData.name,
    productVariantData.size,
    productVariantData.sellingPrice,
    quantity,
  );

  return savedCartItem;
};

const updateCustomerCartItemService = async (
  customerUuid,
  cartItemId,
  cartData,
) => {
  const { quantity } = cartData;

  const customerData =
    await cartRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const cartItemData =
    await cartRepo.checkIfCartItemRelatedToCustomerExistsInDbRepo(
      cartItemId,
      customerUuid,
    );

  if (!cartItemData) {
    return {
      success: false,
      errorMessage: "Cart item not found!",
    };
  }

  const productData = await cartRepo.checkIfProductExistsInDbRepo(
    cartItemData.productId,
  );

  if (!productData) {
    return {
      success: false,
      errorMessage: "Product is no longer available!",
    };
  }

  const productVariantData = await cartRepo.checkIfProductVariantExistsInDbRepo(
    cartItemData.productVariantId,
    cartItemData.productId,
  );

  if (!productVariantData) {
    return {
      success: false,
      errorMessage: "Product variant is no longer available!",
    };
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      success: false,
      errorMessage: "Quantity must be at least 1!",
    };
  }

  if (quantity > productVariantData.stock) {
    return {
      success: false,
      errorMessage: `Only ${productVariantData.stock} item(s) available in stock!`,
    };
  }

  const updatedCartItem = await cartRepo.updateCartItemInDbRepo(
    cartItemId,
    customerUuid,
    quantity,
    productData.name,
    productVariantData.size,
    productVariantData.sellingPrice,
  );

  return updatedCartItem;
};

const deleteCustomerCartItemService = async (customerUuid, cartItemId) => {
  const customerData =
    await cartRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const deletedCartItem = await cartRepo.deleteCartItemFromDbRepo(
    cartItemId,
    customerUuid,
  );

  if (!deletedCartItem) {
    return {
      success: false,
      errorMessage: "Cart item not found!",
    };
  }

  return deletedCartItem;
};

const clearCustomerCartService = async (customerUuid) => {
  const customerData =
    await cartRepo.checkIfCustomerExistsInDbRepo(customerUuid);

  if (!customerData) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const clearedCart = await cartRepo.clearCustomerCartFromDbRepo(customerUuid);

  return clearedCart;
};

module.exports = {
  getCustomerCartService,
  addToCustomerCartService,
  updateCustomerCartItemService,
  deleteCustomerCartItemService,
  clearCustomerCartService,
};
