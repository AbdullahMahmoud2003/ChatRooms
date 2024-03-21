const moment = require("moment");
const tz = require("moment-timezone")

const date = moment();
const cairodate = date.tz("Africa/Cairo");

function formatMessage(username, text) {
    return {
        username,
        text,
        time: cairodate.format("h:mm a"),
    }
}

module.exports = formatMessage;