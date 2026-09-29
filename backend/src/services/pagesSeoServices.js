const pagesSeoRepo = require("../repositories/pagesSeoRepository");

const addPageSeoService = async (pageSeoData) => {
  const savedPageSeoData = await pagesSeoRepo.addPageSeoRepo(pageSeoData);
  return savedPageSeoData;
};

const getAllPagesSeoService = async () => {
  const allPagesSeoData = await pagesSeoRepo.getAllPagesSeoRepo();
  return allPagesSeoData;
};

const getOnePageSeoService = async (pageSeoSlug) => {
  const onePageSeoData = await pagesSeoRepo.getOnePageSeoRepo(pageSeoSlug);

  if (!onePageSeoData) {
    return {
      success: false,
      errorMessage: "No page seo found!",
    };
  }

  return onePageSeoData;
};

const updatePageSeoService = async (pageSeoSlug, pageSeoData) => {
  const updatedPageSeoData = await pagesSeoRepo.updatePageSeoRepo(
    pageSeoSlug,
    pageSeoData,
  );

  if (!updatedPageSeoData) {
    return {
      success: false,
      errorMessage: "Page seo not found!",
    };
  }

  return updatedPageSeoData;
};

const deletePageSeoService = async (pageSeoSlug) => {
  const deletedPageSeoData = await pagesSeoRepo.deletePageSeoRepo(pageSeoSlug);

  if (!deletedPageSeoData) {
    return {
      success: false,
      errorMessage: "Page seo not found!",
    };
  }

  return deletedPageSeoData;
};

module.exports = {
  addPageSeoService,
  getAllPagesSeoService,
  getOnePageSeoService,
  updatePageSeoService,
  deletePageSeoService,
};
