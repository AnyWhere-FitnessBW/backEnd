// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;


// module.exports = (req, res, next) => {

//   try {
   
//     const token = req.headers.authorization ?
//       req.headers.authorization.split(' ')[1] :
//       '';

//     if (token) {
//       jwt.verify(token, secret, (err, decodedToken) => {
//         if (err) {
//           next({ apiCode: 401, apiMessage: 'invalid or missing credentials' });
//         } else {
//           req.decodedToken = decodedToken;
//           next();
//         }
//       });
//     } else {
//       next({ apiCode: 401, apiMessage: 'invalid or missing credentials' });
//     }
//   } catch (err) {
//     next({ apiCode: 500, apiMessage: 'error validating credentials', ...err });
//   }


// };


const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');


module.exports = (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ you: "you are not authorized!" });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }

};