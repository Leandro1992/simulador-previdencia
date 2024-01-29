// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const cors = require('cors')
const path = require('path')
const express = require('express')
const api = express()
const apiPort = 3001;
const controllers = require('./controllers/controller');
api.use(cors()) // Use this after the variable declaration
controllers.initControllers(api);
global.messages = [];


api.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
api.use('/', express.static(path.resolve(__dirname + '/front/build')));