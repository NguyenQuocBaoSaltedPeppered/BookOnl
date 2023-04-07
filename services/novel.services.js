const Novel = require("../models/novel.model");

const authorService = require("./author.services");

const novelService = {
  //new Novel
  newNovel: async (
    title,
    intro,
    types,
    coverLink,
    readCount,
    authorName,
    accountPostedId
  ) => {
    if (!title || !intro || !types) {
      throw Error("Title, Intro, Types must be all filled");
    }
    const isNovelExisted = await Novel.findOne({ title: title });
    if (isNovelExisted) {
      throw Error("Novel is already existed");
    }
    const authorId = await authorService.getAuthorId(authorName);
    try {
      const newNovel = Novel.create({
        title,
        intro,
        types,
        coverLink,
        readCount,
        authorId,
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
