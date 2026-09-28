const faqServices = require("../../services/pagesFaqServices");

const addPageFaq = async (req, res) => {
  const body = req.body;

  const newPageFaq = await faqServices.addPageFaqService(body);

  return res
    .status(201)
    .json({ message: "Page faqs created!", faq: newPageFaq });
};

const getAllPagesFaq = async (req, res) => {
  const allPageFaqs = await faqServices.getAllPagesFaqsService();

  return res
    .status(200)
    .json({ message: "All faqs fetched!", faqs: allPageFaqs });
};

const getOnePageAllFaq = async (req, res) => {
  const pageId = req.params.id;

  const pageFaqData = await faqServices.getOnePageAllFaqService(pageId);

  if (pageFaqData.success === false) {
    return res.status(400).json({ message: pageFaqData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page faq fetched!", faq: pageFaqData });
};

const updateOnePageFaqs = async (req, res) => {
  const pageId = req.params.id;
  const body = req.body;

  const updatedPageFaq = await faqServices.updateOnePageFaqsService(
    pageId,
    body,
  );

  if (updatedPageFaq.success === false) {
    return res.status(400).json({ message: updatedPageFaq.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page faq updated!", faq: updatedPageFaq });
};

const deleteOnePageFaqs = async (req, res) => {
  const pageId = req.params.id;

  const deletedPageFaq = await faqServices.deleteOnePageFaqsService(pageId);

  if (deletedPageFaq.success === false) {
    return res.status(400).json({ message: deletedPageFaq.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page faq deleted!", faq: deletedPageFaq });
};

module.exports = {
  addPageFaq,
  getAllPagesFaq,
  getOnePageAllFaq,
  updateOnePageFaqs,
  deleteOnePageFaqs,
};
