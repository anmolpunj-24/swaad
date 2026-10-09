const blogService = require("../../services/blogServices");

const addBlog = async (req, res) => {
  const body = req.body;

  const newBlogData = await blogService.addBlogService(body);

  return res.status(201).json({ message: "Blog created!", blog: newBlogData });
};

const getAllBlogs = async (req, res) => {
  const allBlogs = await blogService.getAllBlogsService();

  return res
    .status(200)
    .json({ message: "All blogs fetched!", blogs: allBlogs });
};

const getOneBlog = async (req, res) => {
  const blogId = req.params.id;

  const blogData = await blogService.getOneBlogService(blogId);

  if (blogData.success === false) {
    return res.status(400).json({ message: blogData.errorMessage });
  }

  return res.status(200).json({ message: "Blog fetched!", blog: blogData });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const body = req.body;

  const updatedBlogData = await blogService.updateBlogService(blogId, body);

  if (updatedBlogData.success === false) {
    return res.status(400).json({ message: updatedBlogData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Blog updated!", blog: updatedBlogData });
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  const deletedBlog = await blogService.deleteBlogService(blogId);

  if (deletedBlog.success === false) {
    return res.status(400).json({ message: deletedBlog.errorMessage });
  }

  return res.status(200).json({ message: "Blog deleted!" });
};

module.exports = {
  addBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
  deleteBlog,
};
