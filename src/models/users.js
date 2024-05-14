const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        Nombre_usuario: {
            type: String,
            require: [true, "Nombre de usuario es requerido"]
        },
        Correo: {
            type: String,
            require: false
        },
        id_actividades: {
            type: Array,
            require: false
        },
        id_planing: {
            type: String,
            require: false
        },
        Contra: {
            type: String,
            require: false 
        }
        
    }
);

module.exports = mongoose.model('Usuarios', userSchema, 'Usuarios');