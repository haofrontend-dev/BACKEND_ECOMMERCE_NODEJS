'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const _SECONDS = 5000;

const countConnect = () => {
    const numberConnect = mongoose.connections.length;
    console.log('Number connect: ', numberConnect);
    return numberConnect;
}

// Check over connect
const checkOverLoad = () => {
    setInterval(() => {
        const numberConnect = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximun number of connection based on number of cores
        const maxConnect = numCores * 5;

        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        console.log(`Active connections: ${numberConnect}`);

        if (numberConnect > maxConnect) {
            console.log('Connection overload detected!');
        }
    }, _SECONDS) // Monitor every 5 seconds
}

module.exports = {
    countConnect,
    checkOverLoad
};
