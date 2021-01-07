

const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');


module.exports = (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "Invalid Credentials" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json({ error: "you must be logged in" });
  }

};