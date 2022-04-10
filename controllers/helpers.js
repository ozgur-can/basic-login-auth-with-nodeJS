const User = require("../models/User");

const isUserExist = async({ username, password }) => {
  if (username === "" || password === "") return;

  const user = await User.findOne({ username });

  // not exist
  if (!user) return false;
  // password not true
  if (user.password !== password) return false;

  // user exist, return user
  return user;
};

module.exports = { isUserExist };
