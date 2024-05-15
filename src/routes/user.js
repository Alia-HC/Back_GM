const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const bcrypt = require("bcrypt");

router.post('/signup', async (req, res) => {
    const { username, email, id_recurring, password } = req.body;
    const rsal = 10;
    
    bcrypt.hash(username, rsal, async (err, password_encrip) => {
        
        try{
            const user = userSchema({username, email, id_recurring, password: password_encrip});
            await user.save();
            res.send(user);
        } catch (error) {
            console.log("Error al guardar el usuario:", error);
            res.status(500).send("Error al guardar el usuario");
        }
        
    });
    
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
