const Account = require("../models/account.model");

// login
const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Account.login(email, password);
    res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: Error.message });
  }
};
// signup
const signupAccount = async (req, res) => {
  const { name, email, password, avatarLink, isAdmin } = req.body;

  try {
    const user = await Account.signup(
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
};

module.exports = { loginAccount, signupAccount };
