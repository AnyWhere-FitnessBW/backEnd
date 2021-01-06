const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const router = require("express").Router();

const Users = require("../users/user-model");
const { isValid } = require("../users/users-service.js");


router.post("/register", async (req, res, next) => {
  const credentials = req.body;

  try {
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS;

      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;

      const user = await Users.add(credentials);
      const token = generateToken(user);
      res.status(201).json({ data: user, token });
    } else {
      next({ apiCode: 400, apiMessage: 'username or password missing, or password not alphanumeric' });
    }
  } catch (err) {
    console.log(err);
    next({ apiCode: 500, apiMessage: 'error saving new user', ...err });
  }

});



router.post('/login', async (req, res) =>{
  const { username, password } = req.body;

  try{
      const [user] = await Users.findBy({username: username});
      if(user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({message: 'Welcome, login success', token: token})
      } else { 
          res.status(401).json({message:'invalid username or password'})
      } 
  } catch (err) {
      res.status(500).json({error: "error here"})
  }
})



function generateToken(user) {

  const payload = {
    subject: user.id,
    username: user.username,

  };

  
  const options = {
    expiresIn: "1d"
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;

}

module.exports = router;







//   "firstName": "james",
//   "lastname": "hill",
//  "username": "user21",
//  "password": "yellowbuses",
//  "email": "myemail@email.com"
