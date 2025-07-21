"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const { db: { host, port, name } } = require("../configs/config.mongodb");
const uri = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }

        mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize: 50 })
            .then((_) => {
                countConnect();
                console.log("Connected to DB");
            })
            .catch((e) => console.log(e));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instance = Database.getInstance();
module.exports = instance;
