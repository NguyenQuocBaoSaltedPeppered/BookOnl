const bookmarkService = require("../services/bookmark.services");
const { StatusCodes } = require("http-status-codes");
const bookmarkController = {
  newBookmark: async (req, res) => {
    const { accountId, novelId } = req.body;
    try {
      const newBookmark = await bookmarkService.newBookmark(accountId, novelId);
      res.status(StatusCodes.CREATED).json({ newBookmark });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  getBookmark: async (req, res) => {
    const { accountId } = req.body;
    try {
      const bookmarkList = await bookmarkService.getBookmark(accountId);
      res.status(StatusCodes.OK).json({ bookmarkList });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
  // deleteBookmark: async (req, res) => {
  //   const id = req.params.bookmarkId;
  //   try {
  //     const deletedBookmark = await bookmarkService.deleteBookmark(id);
  //     res.status(StatusCodes.OK).json({ deletedBookmark });
  //   } catch (error) {
  //     res.status(error.code).json({ error: error.message });
  //   }
  // },
  deleteBookmark: async (req, res) => {
    const { accountID, novelID } = req.params;
    try {
      const deleteBookmark = await bookmarkService.deleteBookmark(
        accountID,
        novelID
      );
      res.status(StatusCodes.OK).json({ deleteBookmark });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = bookmarkController;
