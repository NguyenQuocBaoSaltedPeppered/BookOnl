const QLNovel = require("../models/novel.qlmodel");

module.exports = {
  Query: {
    async QLNovel(_, { ID }) {
      return await QLNovel.findById(ID);
    },
    async getQLNovel(_, { amount }) {
      return await QLNovel.find().sort({ postAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createQLNovel(_, { QLNovelInput: { title, intro, genre, author } }) {
      const newQLNovel = new QLNovel({
        title: title,
        intro: intro,
        postAt: new Date().toISOString(),
        genre: genre,
        author: author,
      });

      const res = await newQLNovel.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteQLNovel(_, { ID }) {
      const isDelete = (await QLNovel.deleteOne({ _id: ID })).deletedCount;
      return isDelete;
    },
  },
};
