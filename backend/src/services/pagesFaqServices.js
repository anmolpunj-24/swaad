const pagesFaqRepo = require("../repositories/pagesFaqRepository");

const addPageFaqService = async (pageFaqData) => {
  const savedPageFaqData = await pagesFaqRepo.addPageFaqService(pageFaqData);
  return savedPageFaqData;
};

const getAllPagesFaqsService = async () => {
  const allPagesFaqData = await pagesFaqRepo.getAllPagesFaqsService();
  return allPagesFaqData;
};

const getOnePageAllFaqService = async (pageId) => {
  const onePageFaqsData = await pagesFaqRepo.getOnePageAllFaqService(pageId);

  if (!onePageFaqsData) {
    return {
      success: false,
      errorMessage: "No page faqs found!",
    };
  }

  return onePageFaqsData;
};

const updateOnePageFaqsService = async (pageId, pageFaqData) => {
  const updatedPageFaqData = await pagesFaqRepo.updateOnePageFaqsService(
    pageId,
    pageFaqData,
  );

  if (!updatedPageFaqData) {
    return {
      success: false,
      errorMessage: "Page faqs not found!",
    };
  }

  return updatedPageFaqData;
};

const deleteOnePageFaqsService = async (pageId) => {
  const deletedPageFaqData = await pagesFaqRepo.deleteOnePageFaqsService(pageId);
  
    if (!deletedPageFaqData) {
      return {
        success: false,
        errorMessage: "Page faqs not found!",
      };
    }
  
    return deletedPageFaqData;
};

module.exports = {
  addPageFaqService,
  getAllPagesFaqsService,
  getOnePageAllFaqService,
  updateOnePageFaqsService,
  deleteOnePageFaqsService,
};
