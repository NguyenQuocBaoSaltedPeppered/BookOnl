const Bookmark = require("../models/bookmark.model");
const Novel = require("../models/novel.model");
const Account = require("../models/account.model");
const mongoose = require("mongoose");

const castId = (ID) => new mongoose.Types.ObjectId(ID);
const bookmarkService = {
  //new Novel
  newBookmark: async (accountId, novelId) => {
    if (!accountId || !novelId) {
      throw Error("All Field must be filled");
    }
    if (
      !mongoose.Types.ObjectId.isValid(accountId) ||
      !mongoose.Types.ObjectId.isValid(novelId)
    ) {
      throw Error("Id is not valid");
    }
    const isAccountExisted = await Account.find({ _id: accountId });
    if (!isAccountExisted) {
      throw Error("Account is not exist");
    }
    const isNovelExisted = await Novel.find({ _id: novelId });
    if (!isNovelExisted) {
      throw Error("Novel is not exist");
    }
    try {
      const newBookmark = Bookmark.create({ accountId, novelId });
      return newBookmark;
    } catch (error) {
      console.log(error);
    }
  },

  //getLatestNovel
  getBookmark: async (accountId) => {
    if (!accountId) {
      throw Error("accountId field must be filled");
    }
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      throw Error("Id is not valid");
    }
    const isAccountExisted = await Account.find({ _id: accountId });
    if (!isAccountExisted) {
      throw Error("Account is not exist");
    }
    try {
      const bookmarkList = await Bookmark.aggregate([
        {
          $match: {
            accountId: castId(accountId),
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
          $lookup: {
            from: "novels",
            localField: "novelId",
            foreignField: "_id",
            as: "novelInfo",
          },
        },
        {
          $unwind: {
            path: "$accountInfo",
          },
        },
        {
          $unwind: {
            path: "$novelInfo",
          },
        },
        {
          $project: {
            _id: 1,
            "accountInfo._id": 1,
            "accountInfo.name": 1,
            "novelInfo._id": 1,
            "novelInfo.title": 1,
            "novelInfo.intro": 1,
          },
        },
      ]);
      return bookmarkList;
    } catch (error) {
      console.log(error);
    }
  },

  //deleteBookmark
  deleteBookmark: async (bookmarkId) => {
    if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
      throw Error("Id is not valid");
    }
    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
    });
    if (!deletedBookmark) {
      throw Error("No such bookmark");
    }
    return deletedBookmark;
  },
};

module.exports = bookmarkService;
