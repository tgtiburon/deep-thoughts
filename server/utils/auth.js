const jwt = require("jsonwebtoken");

const secret = "mysecretshh";
const expiration = "2h";

// secret has nothing to do with the encryption
// it is used so the server can recognize it's token

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
