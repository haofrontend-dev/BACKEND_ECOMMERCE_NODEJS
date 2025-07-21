require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// Init db
require('./dbs/init.mongodb')
const { checkOverLoad } = require('./helpers/check.connect')
checkOverLoad();
// Init routes

// Handle Errors

module.exports = app;
