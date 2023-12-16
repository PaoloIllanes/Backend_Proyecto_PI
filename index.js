const express = require("express");
const app = express();

//Interpretar datos como JSON
app.use(express.json());
//Solicitudes HTTP
app.use(express.urlencoded({extended: true}));
//Utiliza las rutas definidas en coins.js
app.use(require('./routes/coins'));
//Utiliza las rutas definidas en auth.js
app.use(require('./routes/auth'));
//Escucha solicitudes a los endpoints en el puerto 3000
app.listen(process.env.PORT||3000,() => {
    console.log("Servidor corriendo en el puerto 3000");
});

module.exports = app;