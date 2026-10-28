const mongoose = require("mongoose");
const blogsRepo = require("../repositories/blogRepository");
const blogImagesService = require("../services/blogImagesServices");
const htmlHandler = require("../helperFuntions/htmlHandler");

const getAllBlogsService = async () => {
  const allBlogsData = await blogsRepo.getAllBlogsRepo();
  return allBlogsData;
};

const getOneBlogService = async (blogId) => {
  const oneBlogData = await blogsRepo.getOneBlogRepo(blogId);

  if (!oneBlogData) {
    return {
      success: false,
      errorMessage: "No blog found!",
    };
  }

  return oneBlogData;
};

const validateCategoryAndTags = async (categoryId, tagIds) => {
  const category = await blogsRepo.checkIfCategoryExistInDbRepo(categoryId);

  if (!category) {
    return {
      success: false,
      errorMessage: "Active blog category not found!",
    };
  }

  const uniqueTagIds = [...new Set(tagIds.map(String))];

  if (uniqueTagIds.length) {
    const tags = await blogsRepo.checkIfTagExistInDbRepo(uniqueTagIds);

    if (tags.length !== uniqueTagIds.length) {
      return {
        success: false,
        errorMessage: "One or more active tags were not found!",
      };
    }
  }

  return {
    success: true,
    tagIds: uniqueTagIds,
  };
};

const normalizePublishedAt = (status, publishedAt, existingDate = null) => {
  if (status !== "published") return null;

  if (publishedAt) {
    const parsedDate = new Date(publishedAt);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error("Invalid publication date!");
    }

    return parsedDate;
  }

  return existingDate || new Date();
};

const replaceLocalImageUrls = (html, imageMap) => {
  const updatedHtml = html.replace(/<img\b[^>]*>/gi, (imageTag) => {
    const match = imageTag.match(/\bdata-local-image-id=(["'])(.*?)\1/i);

    if (!match) return imageTag;

    const permanentUrl = imageMap.get(match[2]);

    if (!permanentUrl) {
      throw new Error("An editor image could not be uploaded.");
    }

    let updatedTag = imageTag.replace(/\sdata-local-image-id=(["']).*?\1/i, "");

    if (/\bsrc=(["']).*?\1/i.test(updatedTag)) {
      updatedTag = updatedTag.replace(
        /\bsrc=(["']).*?\1/i,
        `src="${htmlHandler(permanentUrl)}"`,
      );
    } else {
      updatedTag = updatedTag.replace(
        /<img\b/i,
        `<img src="${htmlHandler(permanentUrl)}"`,
      );
    }

    return updatedTag;
  });

  if (/blob:|data-local-image-id/i.test(updatedHtml)) {
    throw new Error("The blog contains an image that has not been uploaded.");
  }

  return updatedHtml;
};

const getReferencedImageUrls = (blogId, featuredImage, content) => {
  const urls = new Set();

  if (featuredImage) {
    urls.add(featuredImage);
  }

  const escapedId = String(blogId).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const imagePattern = new RegExp(
    `${process.env.BASE_URL}/uploads/blogs/${escapedId}/(?:featured|content)/[a-zA-Z0-9_-]+\\.webp`,
    "g",
  );

  for (const match of String(content || "").matchAll(imagePattern)) {
    urls.add(match[0]);
  }

  return urls;
};

const uploadContentImages = async (
  blogId,
  contentImageIds = [],
  contentImageFiles = [],
) => {
  if (contentImageIds.length !== contentImageFiles.length) {
    throw new Error("Editor image files do not match their IDs.");
  }

  if (new Set(contentImageIds).size !== contentImageIds.length) {
    throw new Error("Duplicate editor image IDs are not allowed.");
  }

  const imageMap = new Map();

  try {
    for (let index = 0; index < contentImageIds.length; index += 1) {
      const id = contentImageIds[index];

      if (typeof id !== "string" || !/^[a-zA-Z0-9-]+$/.test(id)) {
        throw new Error("Invalid editor image ID.");
      }

      const file = contentImageFiles[index];

      if (!file) {
        throw new Error("An editor image file is missing.");
      }

      const savedImage = await blogImagesService.saveBlogImage(
        file,
        blogId,
        "content",
      );

      imageMap.set(id, savedImage.image);
    }

    return imageMap;
  } catch (error) {
    await Promise.allSettled(
      [...imageMap.values()].map((url) =>
        blogImagesService.deleteBlogImageFile(url, blogId),
      ),
    );

    throw error;
  }
};

const addBlogService = async (blogData, files = {}) => {
  const validation = await validateCategoryAndTags(
    blogData.categoryId,
    blogData.tagIds || [],
  );

  if (!validation.success) return validation;

  const blogId = new mongoose.Types.ObjectId();
  const createdImageUrls = [];

  try {
    const featuredFile = files.featuredImage?.[0];
    let featuredImage = "";

    if (featuredFile) {
      const savedFeatured = await blogImagesService.saveBlogImage(
        featuredFile,
        blogId,
        "featured",
      );

      featuredImage = savedFeatured.image;
      createdImageUrls.push(featuredImage);
    }

    const imageMap = await uploadContentImages(
      blogId,
      blogData.contentImageIds || [],
      files.contentImages || [],
    );

    createdImageUrls.push(...imageMap.values());

    const content = replaceLocalImageUrls(blogData.content || "", imageMap);

    const status = blogData.status || "draft";

    const payload = {
      _id: blogId,
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt || "",
      content,
      featuredImage,
      categoryId: blogData.categoryId,
      tagIds: validation.tagIds,
      status,
      isFeatured: blogData.isFeatured ?? false,
      publishedAt: normalizePublishedAt(status, blogData.publishedAt),
      seo: blogData.seo || {},
      isActive: blogData.isActive ?? true,
      deletedAt: null,
    };

    return await blogsRepo.addBlogRepo(payload);
  } catch (error) {
    await Promise.allSettled(
      createdImageUrls.map((url) =>
        blogImagesService.deleteBlogImageFile(url, blogId),
      ),
    );

    await blogImagesService.deleteBlogImageDirectory(blogId);

    throw error;
  }
};

const updateBlogService = async (blogId, blogData, files = {}) => {
  const existingBlog = await blogsRepo.getOneBlogRepo(blogId);

  if (!existingBlog) {
    return {
      success: false,
      errorMessage: "No blog found!",
    };
  }

  if (blogData.categoryId) {
    const validation = await validateCategoryAndTags(
      blogData.categoryId,
      blogData.tagIds ??
        existingBlog.tagIds.map((tag) => String(tag._id || tag)),
    );

    if (!validation.success) return validation;

    blogData.tagIds = validation.tagIds;
  } else if (blogData.tagIds !== undefined) {
    const uniqueTagIds = [...new Set(blogData.tagIds.map(String))];
    const tags = uniqueTagIds.length
      ? await blogsRepo.checkIfTagExistInDbRepo(uniqueTagIds)
      : [];

    if (tags.length !== uniqueTagIds.length) {
      return {
        success: false,
        errorMessage: "One or more active tags were not found!",
      };
    }

    blogData.tagIds = uniqueTagIds;
  }

  const createdImageUrls = [];
  const existingFeaturedImage = existingBlog.featuredImage || "";
  const existingContent = existingBlog.content || "";

  try {
    let featuredImage = blogData.featuredImageUrl || existingFeaturedImage;

    const featuredFile = files.featuredImage?.[0];

    if (featuredFile) {
      const savedFeatured = await blogImagesService.saveBlogImage(
        featuredFile,
        blogId,
        "featured",
      );

      featuredImage = savedFeatured.image;
      createdImageUrls.push(featuredImage);
    }

    const imageMap = await uploadContentImages(
      blogId,
      blogData.contentImageIds || [],
      files.contentImages || [],
    );

    createdImageUrls.push(...imageMap.values());

    const content = replaceLocalImageUrls(
      blogData.content ?? existingContent,
      imageMap,
    );

    const status = blogData.status || existingBlog.status;

    const payload = {
      title: blogData.title ?? existingBlog.title,
      slug: blogData.slug ?? existingBlog.slug,
      excerpt: blogData.excerpt ?? existingBlog.excerpt,
      content,
      featuredImage,
      status,
      publishedAt: normalizePublishedAt(
        status,
        blogData.publishedAt,
        existingBlog.publishedAt,
      ),
    };

    if (blogData.categoryId !== undefined) {
      payload.categoryId = blogData.categoryId;
    }

    if (blogData.tagIds !== undefined) {
      payload.tagIds = blogData.tagIds;
    }

    if (blogData.isFeatured !== undefined) {
      payload.isFeatured = blogData.isFeatured;
    }

    if (blogData.isActive !== undefined) {
      payload.isActive = blogData.isActive;
    }

    if (blogData.seo !== undefined) {
      payload.seo = blogData.seo;
    }

    const updatedBlog = await blogsRepo.updateBlogRepo(blogId, payload);

    if (!updatedBlog) {
      throw new Error("Blog update failed.");
    }

    const oldUrls = getReferencedImageUrls(
      blogId,
      existingFeaturedImage,
      existingContent,
    );

    const newUrls = getReferencedImageUrls(
      blogId,
      updatedBlog.featuredImage,
      updatedBlog.content,
    );

    const removedUrls = [...oldUrls].filter((url) => !newUrls.has(url));

    await Promise.allSettled(
      removedUrls.map((url) =>
        blogImagesService.deleteBlogImageFile(url, blogId),
      ),
    );

    return updatedBlog;
  } catch (error) {
    await Promise.allSettled(
      createdImageUrls.map((url) =>
        blogImagesService.deleteBlogImageFile(url, blogId),
      ),
    );

    throw error;
  }
};

const deleteBlogService = async (blogId) => {
  const existingBlog = await blogsRepo.getOneBlogRepo(blogId);

  if (!existingBlog) {
    return {
      success: false,
      errorMessage: "No blog found!",
    };
  }

  const deletedBlog = await blogsRepo.deleteBlogRepo(blogId);

  if (!deletedBlog) {
    return {
      success: false,
      errorMessage: "Failed to delete blog!",
    };
  }

  await blogImagesService.deleteBlogImageDirectory(blogId);

  return deletedBlog;
};

module.exports = {
  addBlogService,
  getAllBlogsService,
  getOneBlogService,
  updateBlogService,
  deleteBlogService,
};
