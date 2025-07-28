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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Init db
require('./dbs/init.mongodb')
const { checkOverLoad } = require('./helpers/check.connect')
// checkOverLoad();
// Init routes
app.use('', require('./routes/index'));
// Handle Errors

module.exports = app;
