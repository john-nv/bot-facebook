const moment = require('moment')

function getDateToday() {
    return moment().utcOffset(7).format('DDMMYYYY');
}
function formatDate(date) {
    return moment(date).utcOffset(7).format('DD/MM/YYYY hh:ss');
}

module.exports = {
    getDateToday,
    formatDate,
}