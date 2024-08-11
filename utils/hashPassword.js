const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10); // generate salt

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt); // generate hash
};

const comparePasswords = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword); // compare passwords
};

module.exports = { hashPassword, comparePasswords };
