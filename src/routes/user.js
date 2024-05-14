const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");

router.post('/Usuarios', async (req, res) => {
    const { username, email, id_recurring, password } = req.query;
    const user = userSchema({Nombre_usuario, email, id_recurring, password});
    await user.save();
    res.send(user);
    /*user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));*/
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.query);
        res.send('true')
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión.');
    }
});


module.exports= router;
