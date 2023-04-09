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
      author,
      accountPostedId,
    } = req.body;
    try {
      const newNovel = await novelService.newNovel(
        title,
        intro,
        types,
        coverLink,
        readCount,
        author,
        accountPostedId
      );
      res.status(StatusCodes.OK).json({ newNovel });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
  getLatest: async (req, res) => {
    try {
      const novelList = await novelService.getLatestNovel();
      res.status(StatusCodes.OK).json({ novelList });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
  sameTypes: async (req, res) => {
    const types = req.body.types;
    try {
      const novelSameTypes = await novelService.sameTypes(types);
      res.status(StatusCodes.OK).json({ novelSameTypes });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
};
module.exports = novelController;
