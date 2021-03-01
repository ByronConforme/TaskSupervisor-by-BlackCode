const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
    console.log(format(timestamp));
    return format(timestamp);
};

helpers.ifSmaller = (arg1, arg2, options) => {
    return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
};

module.exports = helpers;