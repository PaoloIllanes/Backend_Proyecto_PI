const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db.js");
//Obtener todas las divisas con sus respectivos valores convertidos
const getCoins = (request, response) => {
    connection.query("SELECT * FROM coins",
        (error, results) => {
            if(error)
                throw error;
            response.status(200).json(results);
        });
};
//Obtener la conversion de una divisa a otra
const getConversion=(request,response) =>{
    const from =request.params.coin1;
    const to = request.params.coin2;
    connection.query("SELECT "+to+" FROM coins where nombre_moneda="+"'"+from+"'",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });

}

app.route("/coins")
    .get(getCoins);

app.route("/conversion/:coin1/:coin2")
    .get(getConversion);

module.exports = app;