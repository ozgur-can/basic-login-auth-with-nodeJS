const User = require("../models/User");

const getUsers = async () => {
  const users = await User.find();
  return users;
};

const addUser = (username, password) => {
  let user = new User({ username, password });

  user.save((err, user) => {
    if (err) console.error(err);
    console.log("saved to collection.");
  });
};

module.exports = { getUsers, addUser };
