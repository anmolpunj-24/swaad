const normalizeBlogMultipartMiddleware = (req, res, next) => {
  const parseJsonField = (field, fallback) => {
    if (req.body[field] === undefined || req.body[field] === "") {
      return fallback;
    }

    try {
      return typeof req.body[field] === "string"
        ? JSON.parse(req.body[field])
        : req.body[field];
    } catch {
      return undefined;
    }
  };

  req.body.tagIds = parseJsonField("tagIds", []);
  req.body.seo = parseJsonField("seo", {});
  req.body.contentImageIds = parseJsonField("contentImageIds", []);

  if (
    !Array.isArray(req.body.tagIds) ||
    !Array.isArray(req.body.contentImageIds) ||
    !req.body.seo ||
    typeof req.body.seo !== "object" ||
    Array.isArray(req.body.seo)
  ) {
    return res.status(400).json({
      message: "Invalid blog form data.",
    });
  }

  for (const field of ["isFeatured", "isActive"]) {
    if (req.body[field] !== undefined) {
      if (!["true", "false"].includes(req.body[field])) {
        return res.status(400).json({
          message: `Invalid ${field} value.`,
        });
      }

      req.body[field] = req.body[field] === "true";
    }
  }

  if (req.body.publishedAt === "") {
    req.body.publishedAt = null;
  }

  next();
};

module.exports = normalizeBlogMultipartMiddleware;
