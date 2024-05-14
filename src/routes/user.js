const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const bcrypt = require("bcrypt");

router.post('/signup', async (req, res) => {
    const { username, email, id_recurring, password } = req.body;
    const user = userSchema({username, email, id_recurring, password});
    await user.save();
    res.send(user);
    
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
