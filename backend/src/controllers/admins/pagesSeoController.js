const pagesSeoServices = require("../../services/pagesSeoServices");

const addPageSeo = async (req, res) => {
  const body = req.body;

  const newPageSeo = await pagesSeoServices.addPageSeoService(body);

  return res
    .status(201)
    .json({ message: "Page seo created!", seo: newPageSeo });
};

const getAllPagesSeo = async (req, res) => {
  const allPagesSeo = await pagesSeoServices.getAllPagesSeoService();

  return res
    .status(200)
    .json({ message: "All pages seos fetched!", seos: allPagesSeo });
};

const getOnePageSeo = async (req, res) => {
  const pageSeoSlug = req.params.slug;

  const pageSeoData = await pagesSeoServices.getOnePageSeoService(pageSeoSlug);

  if (pageSeoData.success === false) {
    return res.status(400).json({ message: pageSeoData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page seo fetched!", seo: pageSeoData });
};

const updatePageSeo = async (req, res) => {
  const pageSeoSlug = req.params.slug;
  const body = req.body;

  const updatedPageSeo = await pagesSeoServices.updatePageSeoService(
    pageSeoSlug,
    body,
  );

  if (updatedPageSeo.success === false) {
    return res.status(400).json({ message: updatedPageSeo.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page seo updated!", seo: updatedPageSeo });
};

const deletePageSeo = async (req, res) => {
  const pageSeoSlug = req.params.slug;

  const deletedPageSeo =
    await pagesSeoServices.deletePageSeoService(pageSeoSlug);

  if (deletedPageSeo.success === false) {
    return res.status(400).json({ message: deletedPageSeo.errorMessage });
  }

  return res.status(200).json({ message: "Page seo deleted!" });
};

module.exports = {
  addPageSeo,
  getAllPagesSeo,
  getOnePageSeo,
  updatePageSeo,
  deletePageSeo,
};
