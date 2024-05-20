const { route } = require("../routes/user");

const checkpassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!regex.test(password)) {return true;}
};

module.exports = { checkpassword };
