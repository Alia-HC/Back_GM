const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const {encrypt, compare} = require("../secure/handleBcrypt");
const {checkpassword} = require("../secure/secure_password");
const users = require("../models/users");

router.post('/signup', async (req, res) => {
    try{
        const { username, email, id_recurring, password } = req.body;

            
        let email_exist = await users.findOne({email});
        let user_exist = await users.findOne({username});

        if(user_exist){
            res.status(409).json({ message: 'Existing username' });
            return;
        } 
        
        if (email_exist) {
            res.status(409).json({ message: 'Existing email' });
            return;
        }

        
        
        if (!checkpassword(password)){
            return res.status(400).json({ message: 'Your password is weak, remember to use: a capital letter, a small letter, a number and a special character.' });
            return;
        }

       
        const passwordHash =  await encrypt(password);
        const user = await userSchema({
            username, 
            email, 
            id_recurring, 
            password: passwordHash
        })
        
        console.log(username, email, password);

        
        await user.save();
        res.status(201).json({ message: 'Registro correcto' }); 
    
    } catch(e){
        console.error(error);
        res.status(500).json({ message: 'Error en el registro' });
    }   
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userSchema.findOne({ username });

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        const checkPassword = await compare(password, user.password);

        if (!checkPassword) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }

        // Generar Token de autenticación aquí
        // ...

        res.status(200).json({ message: 'Inicio de sesión correcto' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;



module.exports= router;
