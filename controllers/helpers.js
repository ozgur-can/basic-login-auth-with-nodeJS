const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "example";

const isUserExist = async({ username, password }) => {
  if (username === "" || password === "") return;

  const user = await User.findOne({ username });

  if (!user) return;
  if (user.password !== password) return;

  return jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { authenticateUser: isUserExist, verifyToken };
