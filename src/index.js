//Importar express
const express = require('express');
const dbconnect = require('./config');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
const app  = express();

const userRoutes = require("./routes/user");

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () =>{
    console.log("El servidor esta en el puerto 3000");
})

dbconnect();