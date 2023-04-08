const Novel = require("../models/novel.model");
const Account = require("../models/account.model");
const mongoose = require("mongoose");

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
    if (!title || !intro || !types || !author || !accountPostedId) {
      throw Error(
        "Title, Intro, Types, author or accountPostedId must be all filled"
      );
    }
    const isNovelExisted = await Novel.findOne({ title: title });
    if (isNovelExisted) {
      throw Error("Novel is already existed");
    }
    if (!mongoose.Types.ObjectId.isValid(accountPostedId)) {
      throw Error("Id is not valid");
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
      const novelList = await Novel.find().sort({ $natural: -1 }).limit(2);
      return novelList;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = novelService;
