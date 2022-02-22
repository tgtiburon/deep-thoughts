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
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from <tokenvalue>
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }
    // we don't want an error thrown on every request.
    // users with an invalid request should be able to see thoughts
    // So we wrap it in a try

    try {
      // decode and attach user data to request object

      // secret makes sure it's a secure login..it won't be decoded unless
      // the secret matches
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return updated request object
    return req;
  },
};
