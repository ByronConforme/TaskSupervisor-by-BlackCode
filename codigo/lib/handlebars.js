const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    console.log(format(timestamp));
    return format(timestamp);
};

module.exports = helpers;