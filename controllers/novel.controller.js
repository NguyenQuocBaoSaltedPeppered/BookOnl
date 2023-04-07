const novelService = require("../services/novel.services");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const novelController = {
  newNovel: async (req, res) => {
    const {
      title,
      intro,
      types,
      coverLink,
      readCount,
      authorName,
      accountPostedId,
    } = req.body;
    try {
      const newNovel = await novelService.newNovel(
        title,
        intro,
        types,
        coverLink,
        readCount,
        authorName,
        accountPostedId
      );
      res.status(StatusCodes.OK).json({ newNovel });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
  getLatest: async (req, res) => {
    try {
      const novelList = await novelService.getLatestNovel();
      res.status(StatusCodes.OK).json({ novelList });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};
module.exports = novelController;
