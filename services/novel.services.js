const Novel = require("../models/novel.model");
const Account = require("../models/account.model");
const Chapter = require("../models/chapter.model");
const Review = require("../models/review.model");
const Bookmark = require("../models/bookmark.model");
const mongoose = require("mongoose");
const utility = require("./utility.services");

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
      const novelList = await Novel.find().sort({ $natural: -1 }).limit(4);
      return novelList;
    } catch (error) {
      console.log(error);
    }
  },
  sameTypes: async (types) => {
    try {
      const novelSameTypes = await Novel.find({ types: types });
      return novelSameTypes;
    } catch (error) {
      console.log(error);
    }
  },
  get1Novel: async (novelId) => {
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      throw Error("Id is not valid");
    }
    const isNovelExisted = await Novel.find({ _id: novelId });
    if (!isNovelExisted) {
      throw Error("Novel is not exist");
    }
    try {
      const novelInfo = await Novel.aggregate([
        {
          $match: {
            _id: utility.castId(novelId),
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountPostedId",
            foreignField: "_id",
            as: "postedBy",
          },
        },
        {
          $unwind: {
            path: "$postedBy",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            intro: 1,
            types: 1,
            coverLink: 1,
            readCount: 1,
            author: 1,
            "postedBy._id": 1,
            "postedBy.name": 1,
          },
        },
      ]);
      const chapterList = await Chapter.find(
        { novelId: novelId },
        { _id: 1, title: 1, content: 1, createdAt: 1 }
      );
      const reviewList = await Review.aggregate([
        {
          $match: {
            novelId: utility.castId(novelId),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "accounts",
            localField: "accountId",
            foreignField: "_id",
            as: "accountInfo",
          },
        },
        {
          $unwind: {
            path: "$accountInfo",
          },
        },
        {
          $project: {
            _id: 1,
            noiDungCotTruyen: 1,
            boCucTheGioi: 1,
            tinhCachNhanVat: 1,
            content: 1,
            "accountInfo._id": 1,
            "accountInfo.name": 1,
          },
        },
      ]);
      const reviewNum = await Review.find({ novelId: novelId }).count();
      const bookmarkNum = await Bookmark.find({ novelId: novelId }).count();
      return { novelInfo, chapterList, reviewList, reviewNum, bookmarkNum };
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = novelService;
