const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const UserRouter = require('../users/user-router.js');
const AuthRouter = require('../auth/auth-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'Api is up'})
});


server.use("/api/users", UserRouter)
server.use("/api/auth", AuthRouter)



module.exports = server ; 