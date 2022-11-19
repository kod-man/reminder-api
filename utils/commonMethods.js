const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = {
  createToken,
};
