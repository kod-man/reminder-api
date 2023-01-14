const PrioList = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
};

// eslint-disable-next-line operator-linebreak
const EMAIL_RGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_RGX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

module.exports = {
  PrioList,
  EMAIL_RGX,
  PASSWORD_RGX,
};
