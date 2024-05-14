const mongoose = require('mongoose');
require("dotenv").config();

const dbconnect = () => {}
mongoose.connect(process.env.Mongodb_URI)
.then(() => console.log('success'))
.catch((error) => console.error(error));


module.exports = dbconnect;