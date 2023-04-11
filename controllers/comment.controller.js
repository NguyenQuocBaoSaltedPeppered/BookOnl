const commentService = require("../services/comment.services");
const { StatusCodes } = require("http-status-codes");
const commentController = {
  newComment: async (req, res) => {
    const { content, chapterId, accountId } = req.body;
    try {
      const newComment = await commentService.newComment(
        content,
        chapterId,
        accountId
      );
      res.status(StatusCodes.CREATED).json({ newComment });
    } catch (error) {
      res.status(error.code).json({ error: error.message });
    }
  },
};
module.exports = commentController;
