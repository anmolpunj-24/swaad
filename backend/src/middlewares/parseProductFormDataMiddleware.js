const parseProductFormDataMiddleware = (req, res, next) => {
  try {
    if (req.body.product) {
      req.body.product = JSON.parse(req.body.product);
    }

    if (req.body.variants) {
      req.body.variants = JSON.parse(req.body.variants);
    }

    if (req.body.imageMetadata) {
      req.body.imageMetadata = JSON.parse(req.body.imageMetadata);
    }

    if (req.body.deletedVariantIds) {
      req.body.deletedVariantIds = JSON.parse(req.body.deletedVariantIds);
    }

    if (req.body.deletedImages) {
      req.body.deletedImages = JSON.parse(req.body.deletedImages);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid product data!",
    });
  }
};

module.exports = parseProductFormDataMiddleware;
