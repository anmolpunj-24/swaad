const wishlistService = require("../../services/wishlistServices");

const getCustomerWishlist = async (req, res) => {
  const customerUuid = req.params.uuid;

  const wishlist =
    await wishlistService.getCustomerWishlistService(customerUuid);

  if (wishlist.success === false) {
    return res.status(400).json({ message: wishlist.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Wishlist fetched!", wishlist: wishlist });
};

const addToCustomerWishlist = async (req, res) => {
  const customerUuid = req.params.uuid;
  const body = req.body;

  const wishlistItem = await wishlistService.addToCustomerWishlistService(
    customerUuid,
    body,
  );

  if (wishlistItem.success === false) {
    return res.status(400).json({ message: wishlistItem.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Product added to wishlist!", wishlist: wishlistItem });
};

const deleteCustomerWishlistItem = async (req, res) => {
  const customerUuid = req.params.uuid;
  const wishlistItemId = req.params.id;

  const deletedWishlistItem =
    await wishlistService.deleteCustomerWishlistItemService(
      customerUuid,
      wishlistItemId,
    );

  if (deletedWishlistItem.success === false) {
    return res.status(400).json({ message: deletedWishlistItem.errorMessage });
  }

  return res.status(200).json({
    message: "Wishlist item deleted!",
  });
};

const clearCustomerWishlist = async (req, res) => {
  const customerUuid = req.params.uuid;

  const clearWishlist =
    await wishlistService.clearCustomerWishlistService(customerUuid);

  if (clearWishlist.success === false) {
    return res.status(400).json({ message: clearWishlist.errorMessage });
  }

  return res.status(200).json({ message: "Wishlist cleared!" });
};

module.exports = {
  getCustomerWishlist,
  addToCustomerWishlist,
  deleteCustomerWishlistItem,
  clearCustomerWishlist,
};
