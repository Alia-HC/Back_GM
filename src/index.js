//Importar express
const express = require('express');
const dbconnect = require('./config');
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const app  = express();

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () =>{
    console.log("El servidor esta en el puerto: ", PORT);
})

dbconnect();