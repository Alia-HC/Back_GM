const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "Nombre de usuario es requerido"]
        },
        email: {
            type: String,
            require: false
        },
        id_recurring: {
            type: Array,
            require: false
        },
        password: {
            type: String,
            require: false 
        }
        
    }
);

module.exports = mongoose.model('users', userSchema, 'users');