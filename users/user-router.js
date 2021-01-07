const router = require("express").Router();
const db = require('../data/dbConfig')

const Users = require('./user-model')
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role-middlware");


router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404)
    next({ apiCode: 501, apiMessage: 'db error getting users', ...err })
  }
});

router.get("/", (req, res) => {
    db("users")
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get users" });
      });
  });




module.exports = router;