const accountService = require("../services/account.services");
const { StatusCodes } = require("http-status-codes");
const accountController = {
  // login
  loginAccount: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await accountService.login(email, password);
      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
  // signup
  signupAccount: async (req, res) => {
    const { name, email, password, avatarLink, isAdmin } = req.body;

    try {
      const user = await accountService.signup(
        name,
        email,
        password,
        avatarLink,
        isAdmin
      );
      res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
};

module.exports = accountController;
