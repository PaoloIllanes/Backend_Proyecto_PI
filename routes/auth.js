const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db.js");
//Registrar un usuario
const register = (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona nombre de usuario y contraseña.' });
      }
    
    connection.query('INSERT INTO usuarios (username, passwd) VALUES (?, ?)', [username, password], (error, results) => {
        if (error) {
          return response.status(500).json({ message: 'Error al registrar usuario en la base de datos.' });
        }
    
        return response.status(200).json({ message: '¡Registro exitoso!' });
      });
}
const login = (request, response) =>{
    const { username, password } = request.body;
  
    if (!username || !password) {
      return response.status(400).json({ message: 'Por favor, proporcione nombre de usuario y contraseña.' });
    }
    connection.query('SELECT * FROM usuarios WHERE username = ?', [username], (error, results) => {
      if (error) {
        return response.status(500).json({ message: 'Error al buscar usuario en la base de datos.' });
      }
      if (results.length === 0) {
        return response.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
      }
      const user = results[0];
      if (user.password !== password) {
        return response.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
      }
      return response.status(200).json({ message: '¡Inicio de sesión exitoso!' });
    });
  };

app.route("/register")
    .post(register);

app.route("/login")
    .get(login);

module.exports = app;