require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();

const db = require("./src/config/db");

const errorHandlingMiddleware = require("./src/middlewares/globalErrorHandlingMiddleware");

const server = async () => {
  await db();

  app.use(express.json());

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  const authRoutes = require("./src/routes/authRoutes");
  app.use("/api/auth", authRoutes);

  const adminAuthRoutes = require("./src/routes/adminAuthRoutes");
  app.use("/api/admin", adminAuthRoutes);

  const userRoutes = require("./src/routes/userRoutes");
  app.use("/api/admin/user", userRoutes);

  const customerRoutes = require("./src/routes/customerRoutes");
  app.use("/api/auth/customer", customerRoutes);

  const customerAddressRoutes = require("./src/routes/customerAddressRoutes");
  app.use("/api/auth/customer/:uuid/address", customerAddressRoutes);

  const productRoutes = require("./src/routes/productRoutes");
  app.use("/api/admin/product", productRoutes);

  const productVariantRoutes = require("./src/routes/productVariantRoutes");
  app.use("/api/admin/product/:productId/variant", productVariantRoutes);

  const productImageRoutes = require("./src/routes/productImagesRoutes");
  app.use(
    "/api/admin/product/:productId/variant/:variantId/image",
    productImageRoutes,
  );

  const productReviewRoutes = require("./src/routes/productReviewsRoutes");
  app.use("/api/admin/product/:productId/review", productReviewRoutes);

  const productSeoRoutes = require("./src/routes/productSeoRoutes");
  app.use(
    "/api/admin/product/:productId/variant/:variantId/seo",
    productSeoRoutes,
  );

  const categoryRoutes = require("./src/routes/categoryRoutes");
  app.use("/api/admin/category", categoryRoutes);

  app.use(errorHandlingMiddleware);

  PORT = process.env.PORT || 5000;

  app.listen(PORT, function () {
    console.log(`Backend is running on port ${PORT}`);
  });
};

server();
