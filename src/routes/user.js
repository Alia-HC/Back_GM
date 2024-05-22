const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const {encrypt, compare} = require("../secure/handleBcrypt");
const {checkpassword} = require("../secure/secure_password");
const users = require("../models/users");

router.post('/signup', async (req, res) => {
    try{
        const { username, email, id_recurring, password } = req.body;


        if (!username || !email || !password){
            res.send("Llena todos los campos");
            return;
        }

            
        let email_exist = await users.findOne({email}) || null;
        let user_exist = await users.findOne({username}) || null;

        if(user_exist != null && email_exist != null){
            res.send("Usuario ya registrado");
            return;
        } 
        
        if (user_exist !== null) {
            res.send("Este nombre de usuario ya ha sido usado");
            return;
        }
        
        if(email_exist !== null) {
            res.send("Este correo ya ha sido registrado");
            return;
        }

        
        
        if (!checkpassword(password)){
            res.send("Tu contraseña es débil, recuerda usar: una mayúscula, una minúscula, un número y un carácter especial");
            return;
        }

       
        const passwordHash =  await encrypt(password);
        const user = await userSchema({
            username, 
            email, 
            id_recurring, 
            password: passwordHash
        })
        

        
        await user.save();
        res.send(user);
           
    
    } catch(e){
        console.log("Error al registrar usuario ", e);
        
    }
    
    
});

router.post('/login', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email){
            res.send("Ingrese los datos necesarios");
            return;
        }

        const name = await userSchema.findOne({username});

        if(!name){
            res.send("Usuario no encontrado");
            return;
        }       

        const checkpassword = await compare(password, name.password);
         
        if(!checkpassword){
            res.send('false');
            return;
        }

        //Generar Token de autenticación

       
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión.');
    }
});


module.exports= router;
