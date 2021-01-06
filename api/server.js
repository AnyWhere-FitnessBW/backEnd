const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'Api is up'})
});

// const UserRouter = require('../users/user-router.js');
const AuthRouter = require('../auth/auth-router.js')




module.exports = server ; 