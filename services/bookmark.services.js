const Bookmark = require("../models/bookmark.model");
const Novel = require("../models/novel.model");
const Account = require("../models/account.model");
const utility = require("./utility.services");
const mongoose = require("mongoose");

const bookmarkService = {
  //new Novel
  newBookmark: async (accountId, novelId) => {
    if (!accountId || !novelId) {
      const error = utility.createError(400, "All Ids field must be filled");
      throw error;
    }
    if (
      !mongoose.Types.ObjectId.isValid(accountId) ||
      !mongoose.Types.ObjectId.isValid(novelId)
    ) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isAccountExisted = await Account.findById(accountId);
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    const isNovelExisted = await Novel.findById(novelId);
    if (!isNovelExisted) {
      const error = utility.createError(404, "Novel is not exist");
      throw error;
    }
    const isBookmarkExisted = await Bookmark.findOne({
      accountId: accountId,
      novelId: novelId,
    });
    if (isBookmarkExisted) {
      const error = utility.createError(303, "Bookmark is already existed");
      throw error;
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
      const error = utility.createError(400, "accountId field must be filled");
      throw error;
    }
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const isAccountExisted = await Account.findById(accountId);
    if (!isAccountExisted) {
      const error = utility.createError(404, "Account is not exist");
      throw error;
    }
    try {
      const bookmarkList = await Bookmark.aggregate([
        {
          $match: {
            accountId: utility.castId(accountId),
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
            path: "$novelInfo",
          },
        },
        {
          $project: {
            _id: 1,
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
      const error = utility.createError(400, "Id is not valid");
      throw error;
    }
    const deletedBookmark = await Bookmark.findOneAndDelete({
      _id: bookmarkId,
    });
    if (!deletedBookmark) {
      const error = utility.createError(404, "No such Bookmark");
      throw error;
    }
    return deletedBookmark;
  },
};

module.exports = bookmarkService;
