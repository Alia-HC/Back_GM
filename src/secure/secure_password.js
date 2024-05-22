const { route } = require("../routes/user");

const checkpassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*=-])[a-zA-Z\d!@#$%^&*=-]{8,}$/;
    
    return regex.test(password);
};

module.exports = { checkpassword };
