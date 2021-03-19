
const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
};

helpers.matchPassword = async (password, savePassword) => {
    try {
        return await bcrypt.compare(password, savePassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;