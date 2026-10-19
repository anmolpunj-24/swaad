const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const blogUploadsDirectory = path.join(process.cwd(), "uploads", "blogs");

const saveBlogImage = async (file, blogId, imageType) => {
  if (!file) {
    return {
      success: false,
      errorMessage: "Image file is required!",
    };
  }

  if (!["featured", "content"].includes(imageType)) {
    return {
      success: false,
      errorMessage: "Invalid blog image type!",
    };
  }

  const imageDirectory = path.join(
    blogUploadsDirectory,
    String(blogId),
    imageType,
  );

  await fs.mkdir(imageDirectory, { recursive: true });

  const originalName = path
    .parse(file.originalname)
    .name.replace(/[^a-zA-Z0-9-_]/g, "-");

  const fileName = `${Date.now()}-${crypto.randomUUID()}-${originalName}.webp`;
  const filePath = path.join(imageDirectory, fileName);

  try {
    await sharp(file.buffer).rotate().webp({ quality: 80 }).toFile(filePath);

    return {
      success: true,
      image: `${process.env.BASE_URL}/uploads/blogs/${blogId}/${imageType}/${fileName}`,
      filePath,
    };
  } catch (error) {
    await fs.unlink(filePath).catch(() => {});
    throw error;
  }
};

const deleteBlogImageFile = async (imageUrl, blogId) => {
  if (typeof imageUrl !== "string") return;

  const escapedBlogId = String(blogId).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pattern = new RegExp(
    `^${process.env.BASE_URL}/uploads/blogs/${escapedBlogId}/(featured|content)/([a-zA-Z0-9_-]+\\.webp)$`,
  );

  const match = imageUrl.match(pattern);

  if (!match) return;

  const filePath = path.join(
    blogUploadsDirectory,
    String(blogId),
    match[1],
    match[2],
  );

  await fs.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
};

const deleteBlogImageDirectory = async (blogId) => {
  const directory = path.join(blogUploadsDirectory, String(blogId));

  await fs.rm(directory, {
    recursive: true,
    force: true,
  });
};

module.exports = {
  saveBlogImage,
  deleteBlogImageFile,
  deleteBlogImageDirectory,
};
