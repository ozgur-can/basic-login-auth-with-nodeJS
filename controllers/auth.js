const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "example";

const authenticateUser = async({ username, password }) => {
  if (username === "" || password === "") return;

  const user = await User.findOne({ username });

  if (!user) return;
  if (user.password !== password) return;

//   return jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
  return jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { authenticateUser, verifyToken };
