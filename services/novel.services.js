const Novel = require("../models/novel.model");
const Account = require("../models/account.model");

const novelService = {
  //new Novel
  newNovel: async (
    title,
    intro,
    types,
    coverLink,
    readCount,
    author,
    accountPostedId
  ) => {
    if (!title || !intro || !types) {
      throw Error("Title, Intro, Types must be all filled");
    }
    const isNovelExisted = await Novel.findOne({ title: title });
    if (isNovelExisted) {
      throw Error("Novel is already existed");
    }
    const isAccountExisted = await Account.find({ _id: accountPostedId });
    if (!isAccountExisted) {
      throw Error("Account is not exist");
    }
    try {
      const newNovel = Novel.create({
        title,
        intro,
        types,
        coverLink,
        readCount,
        author,
        accountPostedId,
      });
      return newNovel;
    } catch (error) {
      console.log(error);
    }
  },

  //getLatestNovel
  getLatestNovel: async () => {
    try {
      const novelList = await Novel.find().sort({ $natural: -1 });
      return novelList;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = novelService;
