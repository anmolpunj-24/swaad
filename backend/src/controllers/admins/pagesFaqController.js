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
  const pageSlug = req.params.pageSlug;

  const pageFaqData = await faqServices.getOnePageAllFaqService(pageSlug);

  if (pageFaqData.success === false) {
    return res.status(400).json({ message: pageFaqData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Page faq fetched!", faq: pageFaqData });
};

const updateOnePageFaqs = async (req, res) => {
  const pageSlug = req.params.pageSlug;
  const body = req.body;

  const updatedPageFaq = await faqServices.updateOnePageFaqsService(
    pageSlug,
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
  const pageSlug = req.params.pageSlug;

  const deletedPageFaq = await faqServices.deleteOnePageFaqsService(pageSlug);

  if (deletedPageFaq.success === false) {
    return res.status(400).json({ message: deletedPageFaq.errorMessage });
  }

  return res.status(200).json({ message: "Page faq deleted!" });
};

module.exports = {
  addPageFaq,
  getAllPagesFaq,
  getOnePageAllFaq,
  updateOnePageFaqs,
  deleteOnePageFaqs,
};
