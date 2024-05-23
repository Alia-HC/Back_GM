const express = require("express");
const router = express.Router();
const eventSchema = require("../models/events");
const { consumers } = require("nodemailer/lib/xoauth2");

router.post('/new_event', async (req, res) => {
    try{
        //const event = eventSchema(req.body);
        const {event, location, description, notification_min, date_hour} = req.body;

        if(!event || !date_hour){
            res.send("Se requieren más datos para agendar");
            return;
        }

        if(0>notification_min>60){
            res.send("Tiempo de notificación inválido");
            return;
        }

        const new_event = await eventSchema({
            event,
            location,
            description,
            notification_min,
            date_hour
        })

        await new_event.save();
        res.send(new_event);


    }catch (e){
        console.log("Error al agregar nuevo evento", e);
    }
});

module.exports=router;