const { EMAIL_RGX, PASSWORD_RGX } = require("./Constants");

const validateUser = (user) => {
  const { password, email } = user;
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (!email.match(EMAIL_RGX)) {
    errors.email = "Email must be a valid email address";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }
  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (password.length > 20) {
    errors.password = "Password must be less than 20 characters";
  }

  // check if user password includes at least one number one uppercase and one lowercase letter
  if (!password.match(PASSWORD_RGX)) {
    errors.password =
      "Password must contain at least one number, one uppercase and one lowercase letter";
  }
  return {
    errors,
  };
};

module.exports = {
  validateUser,
};
