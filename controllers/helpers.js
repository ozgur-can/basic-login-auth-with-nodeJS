const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "example";

const isUserExist = async ({ username, password }) => {
  if (username === "" || password === "") return;

  const user = await User.findOne({ username });

  if (!user) return;
  if (user.password !== password) return;

  return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

const getUserName = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
    // resolve(user);
  } catch (err) {
    throw err;
    // reject(err);
  }
}

module.exports = { isUserExist, verifyToken, getUserName };
