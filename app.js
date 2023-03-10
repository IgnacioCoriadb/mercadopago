const express = require('express');
const router = require('./src/routes/index');
const http = require('http');
const cors = require('cors');
const mercadopago = require('mercadopago');
const server = express();
require('dotenv').config();
require('./src/database');



server.use(express.json());
server.use(cors({origin: '*'}));
server.use("/", router);

mercadopago.configure({
    access_token: process.env.KEY_MERCADOPAGO
})

module.exports = server
