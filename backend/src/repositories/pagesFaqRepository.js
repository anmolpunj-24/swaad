const pageFaqModel = require("../models/pages_faq");

const addPageFaqRepo = async (pageFaqData) => {
  const newPageFaq = new pageFaqModel(pageFaqData);
  const savedPageFaqData = await newPageFaq.save();
  return savedPageFaqData;
};

const allPagesFaqRepo = async () => {
  return await pageFaqModel
    .find({
      deletedAt: null,
      isActive: true,
    })
    .select("_id pageName pageSlug isActive createdAt")
    .sort("-createdAt")
    .lean();
};

const onePageAllFaqs = async (pageSlug) => {
  return await pageFaqModel
    .find({
      pageSlug,
      deletedAt: null,
      isActive: true,
    })
    .select(
      "_id pageName pageSlug question questionSlug answer isActive createdAt",
    )
    .sort("-createdAt")
    .lean();
};

const updatePageFaqsRepo = async (faqId, pageSlug, pageFaqData) => {
  return await pageFaqModel.findOneAndUpdate(
    {
      _id: faqId,
      pageSlug,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: pageFaqData,
    },
    { returnDocument: "after" },
  );
};

const deletePageFaqsRepo = async (pageSlug) => {
  return await pageFaqModel.updateMany(
    {
      pageSlug,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
  );
};

const deleteOnePageOneFaqRepo = async (faqId, pageSlug) => {
  return await pageFaqModel.findOneAndUpdate(
    {
      _id: faqId,
      pageSlug,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
    { new: true },
  );
};

module.exports = {
  addPageFaqRepo,
  allPagesFaqRepo,
  onePageAllFaqs,
  updatePageFaqsRepo,
  deletePageFaqsRepo,
  deleteOnePageOneFaqRepo,
};
