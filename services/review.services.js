const Review = require("../models/review.model");
const Account = require("../models/account.model");
const Novel = require("../models/novel.model");
const mongoose = require("mongoose");

const reviewService = {
  newReview: async (
    noiDungCotTruyen,
    boCucTheGioi,
    tinhCachNhanVat,
    content,
    novelId,
    accountId
  ) => {
    if (
      !noiDungCotTruyen ||
      !boCucTheGioi ||
      !tinhCachNhanVat ||
      !content ||
      !novelId ||
      !accountId
    ) {
      throw Error("All field must be filled");
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
    const isReviewExisted = await Review.find({
      accountId: accountId,
      novelId: novelId,
    }).count();
    if (isReviewExisted > 0) {
      throw Error("Review is already existed");
    }
    try {
      const newReview = await Review.create({
        noiDungCotTruyen,
        boCucTheGioi,
        tinhCachNhanVat,
        content,
        novelId,
        accountId,
      });
      return newReview;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = reviewService;
