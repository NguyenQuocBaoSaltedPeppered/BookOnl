const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
const validator = require("validator");

const accountService = {
  //signup
  signup: async (name, email, password, avatarLink, isAdmin) => {
    if (!email || !password || !name) {
      throw Error("All field must be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email not valid!");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough!");
    }
    const isEmailExisted = await Account.findOne({ email: email });

    if (isEmailExisted) {
      throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const newAccount = await Account.create({
        name,
        email,
        password: hash,
        avatarLink,
        isAdmin,
      });

      return newAccount;
    } catch (error) {
      console.log(error);
    }
  },

  //login
  login: async (email, password) => {
    if (!email || !password) {
      throw Error("All field must be filled");
    }
    const acc = await Account.findOne({ email: email });
    if (!acc) {
      throw Error("Incorrect Email!");
    }
    const isPasswordMatch = await bcrypt.compare(password, acc.password);
    if (!isPasswordMatch) {
      throw Error("Password is incorrect!");
    }

    return acc;
  },
};

module.exports = accountService;
