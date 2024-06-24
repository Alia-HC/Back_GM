const express = require("express");
const router = express.Router();
const eventSchema = require("../models/events");
const { consumers } = require("nodemailer/lib/xoauth2");

router.post('/new_event', async (req, res) => {
    try{
       
        const {event, location, description, notification_min, date_hour} = req.body;


        const new_event = await eventSchema({
            event,
            location,
            description,
            notification_min,
            date_hour: new Date(date_hour)
        })

        await new_event.save();
        res.send(new_event);


    }catch (e){
        console.log("Error al agregar nuevo evento", e);
    }
});

router.post('/modify_event', async (req, res) => {
    try{
       
        const {event, location, description, notification_min, date_hour} = req.body;

        


    }catch (e){
        console.log("Ha surgido un error ", e);
    }
});

module.exports=router;