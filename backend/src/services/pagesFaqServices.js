const pagesFaqRepo = require("../repositories/pagesFaqRepository");

const addPageFaqService = async (pageFaqData) => {
  const { pageSlug, pageName, faqs } = pageFaqData;

  const savedPageFaqs = [];

  for (const faq of faqs) {
    const savedFaq = await pagesFaqRepo.addPageFaqRepo({
      pageSlug,
      pageName,
      questionSlug: faq.questionSlug,
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
    });

    savedPageFaqs.push(savedFaq);
  }

  return savedPageFaqs;
};

const getAllPagesFaqsService = async () => {
  const allPagesFaqData = await pagesFaqRepo.allPagesFaqRepo();
  return allPagesFaqData;
};

const getOnePageAllFaqService = async (pageSlug) => {
  const onePageFaqsData = await pagesFaqRepo.onePageAllFaqs(pageSlug);

  if (!onePageFaqsData?.length) {
    return {
      success: false,
      errorMessage: "No page faqs found!",
    };
  }

  return onePageFaqsData;
};

const updateOnePageFaqsService = async (pageSlug, pageFaqData) => {
  const { pageName, faqs } = pageFaqData;

  const existingFaqs = await pagesFaqRepo.onePageAllFaqs(pageSlug);

  const submittedFaqIds = faqs
    .filter((faq) => faq._id)
    .map((faq) => faq._id.toString());

  for (const existingFaq of existingFaqs) {
    if (!submittedFaqIds.includes(existingFaq._id.toString())) {
      await pagesFaqRepo.deleteOnePageOneFaqRepo(existingFaq._id, pageSlug);
    }
  }

  for (const faq of faqs) {
    if (faq._id) {
      await pagesFaqRepo.updatePageFaqsRepo(faq._id, pageSlug, {
        pageName,
        question: faq.question,
        questionSlug: faq.questionSlug,
        answer: faq.answer,
        isActive: faq.isActive,
      });
    } else {
      await pagesFaqRepo.addPageFaqRepo({
        pageSlug,
        pageName,
        questionSlug: faq.questionSlug,
        question: faq.question,
        answer: faq.answer,
        isActive: faq.isActive,
      });
    }
  }

  const updatedPageFaqData = await pagesFaqRepo.onePageAllFaqs(pageSlug);

  if (!updatedPageFaqData?.length) {
    return {
      success: false,
      errorMessage: "Page faqs not found!",
    };
  }

  return updatedPageFaqData;
};

const deleteOnePageFaqsService = async (pageSlug) => {
  const deletedPageFaqData = await pagesFaqRepo.deletePageFaqsRepo(pageSlug);

  if (deletedPageFaqData.matchedCount === 0) {
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
