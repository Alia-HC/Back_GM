const express = require("express");
const router = express.Router();
const userSchema = require("../models/users");
const {encrypt, compare} = require("../secure/handleBcrypt");
const {checkpassword} = require("../secure/secure_password");
const users = require("../models/users");

router.post('/signup', async (req, res) => {
    try{
        const { username, email, id_recurring, password } = req.body;

        //Usuario existente
        if (username && email && password){
            var exist = 0;
            let email_exist = await users.findOne({email}) || null;
            let user_exist = await users.findOne({username}) || null;

            if(user_exist != null && email_exist != null){
                res.send("Usuario ya registrado");
                exist+=1;
            } else if (user_exist !== null) {
                res.send("Este nombre de usuario ya ha sido usado");
                exist+=1;
            }else if(email_exist !== null) {
                res.send("Este correo ya ha sido registrado");
                exist+=1;
            } else {exist=0;}

            if(exist==0){
                //Validar contraseña segura
                if (checkpassword(password)==true){
                    
                    //res.send("Contraseña segura");

                    // Encriptación de contraseña
                    const passwordHash =  await encrypt(password);
                    const user = await userSchema({
                        username, 
                        email, 
                        id_recurring, 
                        password: passwordHash
                    })
            
                

                // //correo al usuario ya registrado
                
                    await user.save();
                    res.send(user);

                }
                res.send("Tu contraseña es débil, recuerda usar...");
                res.send(" - Al menos una letra minúscula");
                res.send(" - Al menos una letra mayúscula");
                res.send(" - Al menos un número");
                res.send(" - Al menos un carácter especial");
            }


        } else{res.send("Llena todos los campos");}
    
    } catch(e){
        console.log("Error al registrar usuario ", e);
        
    }
    
    
});

router.post('/login', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(username || email){
            const name = await userSchema.findOne({username});
            //const mail = await userSchema.findOne({email});

            if(!name){
                //res.status(404);
                res.send("Usuario no encontrado");
            }
            
            // if(!mail){
            //     //res.status(404);
            //     res.send("Usuario no encontrado");
            // }

            //Comparación de contraseña
            const checkpassword = await compare(password, name.password);
            // //Generar token de autenticación
            
            
            if(checkpassword){
                // res.send({
                //     data: user
                // })
                res.send('true');
                console.log(user);
                //return
            }else{
                res.send('false');
                // res.send({
                //     error: 'Contraseña incorrecta'
                // })
            }
            
        }else{res.send("Ingrese los datos necesarios");}

       
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión.');
    }
});


module.exports= router;
