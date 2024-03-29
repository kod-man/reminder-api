module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-underscore-dangle": "off",
    "linebreak-style": "off",
    "object-curly-newline": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    quotes: ["error", "double"],
  },
};
