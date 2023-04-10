const mongoose = require("mongoose");

const utility = {
  castId: (id) => new mongoose.Types.ObjectId(id),
};
module.exports = utility;
