var express = require('express');
const helmet = require('helmet');
var cors = require('cors')
require('dotenv').config();

const app = express()
app.use(cors())
const controllers = require('./controllers')

// Middlewares
app.use(express.json())
app.use(helmet())

// Routes
app.post('/fetchFile', (req, res) => controllers.fetchFile(req, res))

app.post('/fetchMultipleFiles',  (req, res) => controllers.fetchMultipleFiles(req, res))

app.listen(4000, () => console.log("APP RUNNING ON PORT:4000"))