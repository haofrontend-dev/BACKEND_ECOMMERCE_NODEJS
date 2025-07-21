'use strict'

const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/ShopDEV';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(e => console.log(e));

if (1 === 0) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose;
