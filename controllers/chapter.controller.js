const chapterService = require("../services/chapter.services");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const chapterController = {
  newChapter: async (req, res) => {
    const { title, content, novelId } = req.body;

    try {
      const newChapter = await chapterService.newChapter(
        title,
        content,
        novelId
      );
      res.status(StatusCodes.OK).json({ newChapter });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
  getChapter: async (req, res) => {
    const chapterId = req.params.chapterId;
    try {
      const chapter = await chapterService.getChapter(chapterId);
      res.status(StatusCodes.OK).json({ chapter });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
};
module.exports = chapterController;
