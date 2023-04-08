const Novel = require("../models/novel.model");
const Chapter = require("../models/chapter.model");
const mongoose = require("mongoose");

const novelService = {
  newChapter: async (title, content, novelId) => {
    const isNovelExisted = await Novel.find({ _id: novelId });
    if (!title || !content || !novelId) {
      throw Error("All field must be filled");
    }
    if (!isNovelExisted) {
      throw Error("Novel is not exist");
    }
    try {
      const newChapter = await Chapter.create({ title, content, novelId });
      return newChapter;
    } catch (error) {
      console.log(error);
    }
  },
  getChapter: async (chapterId) => {
    try {
      if (!chapterId) {
        throw Error("ChapterId field must be filled");
      }
      if (!mongoose.Types.ObjectId.isValid(chapterId)) {
        throw Error("Id is not valid");
      }
      const chapter = Chapter.find({ _id: chapterId });
      if (!chapter) {
        throw Error("Chapter is not existed");
      }
      return chapter;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = novelService;
