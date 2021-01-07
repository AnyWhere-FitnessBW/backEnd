const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('../users/user-router.js');
const AuthRouter = require('../auth/auth-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use("/api/users", userRouter)
server.use("/api/auth", AuthRouter)


server.get('/', (req, res) => {
    res.status(200).json({message: 'Api is up'})
});


module.exports = server ; 