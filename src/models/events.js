const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        event: {
            type: String,
            require: [true, "El nombre del evento es requerido"]
        },
        location: {
            type: String,
            require: false
        },
        description: {
            type: String,
            require: false
        },
        notification_min: {
            type: Number,
            require: false 
        },
        date_hour: {
            type: Date,
            require: false
        }
        
    }
);

module.exports = mongoose.model('events', eventSchema, 'events');