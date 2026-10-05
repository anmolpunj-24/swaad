const cartService = require("../../services/cartServices");

const getCustomerCart = async (req, res) => {
  const customerUuid = req.params.uuid;

  const cart = await cartService.getCustomerCartService(customerUuid);

  if (cart.success === false) {
    return res.status(400).json({ message: cart.errorMessage });
  }

  return res.status(200).json({ message: "Cart fetched!", cart: cart });
};

const addToCustomerCart = async (req, res) => {
  const customerUuid = req.params.uuid;
  const body = req.body;

  const cartItem = await cartService.addToCustomerCartService(
    customerUuid,
    body,
  );

  if (cartItem.success === false) {
    return res.status(400).json({ message: cartItem.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Product added to cart!", cart: cartItem });
};

const updateCustomerCartItem = async (req, res) => {
  const customerUuid = req.params.uuid;
  const cartItemId = req.params.id;
  const body = req.body;

  const updatedCartItem = await cartService.updateCustomerCartItemService(
    customerUuid,
    cartItemId,
    body,
  );

  if (updatedCartItem.success === false) {
    return res.status(400).json({ message: updatedCartItem.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Cart item updated!", cartItem: updatedCartItem });
};

const deleteCustomerCartItem = async (req, res) => {
  const customerUuid = req.params.uuid;
  const cartItemId = req.params.id;

  const deletedCartItem = await cartService.deleteCustomerCartItemService(
    customerUuid,
    cartItemId,
  );

  if (deletedCartItem.success === false) {
    return res.status(400).json({ message: deletedCartItem.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Cart item deleted!", cartItem: deletedCartItem });
};

const clearCustomerCart = async (req, res) => {
  const customerUuid = req.params.uuid;

  const clearCart = await cartService.clearCustomerCartService(customerUuid);

  if (clearCart.success === false) {
    return res.status(400).json({ message: clearCart.errorMessage });
  }

  return res.status(200).json({ message: "Cart cleared!" });
};

module.exports = {
  getCustomerCart,
  addToCustomerCart,
  updateCustomerCartItem,
  deleteCustomerCartItem,
  clearCustomerCart,
};
