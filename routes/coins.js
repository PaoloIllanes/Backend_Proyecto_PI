const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getCoins = (request, response) => {
    connection.query("SELECT * FROM coins",
        (error, results) => {
            if(error)
                throw error;
            response.status(200).json(results);
        });
};

app.route("/coins")
    .get(getCoins);

module.exports = app;