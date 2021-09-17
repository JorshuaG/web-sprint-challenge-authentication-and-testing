const User = require("../model/model");

const checkUsernameTaken = async (req, res, next) => {
  try {
    const user = await User.findBy(req.body.username);

    if (user) {
      next({ status: 401, message: "username taken" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await User.findBy(req.body.username);

    if (!user) {
      next({ status: 401, message: "invalid credentials" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateFields = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({ status: 401, message: "username and password required" });
  } else {
    req.body.username = req.body.username.trim();
    next();
  }
};

module.exports = { checkUsernameExists, validateFields, checkUsernameTaken };
