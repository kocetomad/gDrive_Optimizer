var express = require('express');
const helmet = require('helmet');
var https = require('https');
var fs = require('fs');
require('dotenv').config();

const app = express()

const controllers = require('./controllers')

// Middlewares
app.use(express.json())
app.use(helmet())

// Routes
app.get('/', (req, res) => res.send("its focken working"))

app.post('/fetchFile', (req, res) => controllers.fetchFile(req, res))

app.listen(4000, () => console.log("APP RUNNING ON PORT:4000"))