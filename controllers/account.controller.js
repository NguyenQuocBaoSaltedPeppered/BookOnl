const accountService = require("../services/account.services");
const accountController = {
  // login
  loginAccount: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await accountService.login(email, password);
      res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = accountController;
