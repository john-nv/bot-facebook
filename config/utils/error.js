const { MESSAGES } = require('../constants');

module.exports = {
    errorCommand: function (api, error, idProfile) {
        let message = MESSAGES.ERROR_COMMAND
        if (error.code == 'ERR_INVALID_ARG_TYPE' || error.code == 'MODULE_NOT_FOUND') message = MESSAGES.NOT_FOUND
        api.sendMessage(message, idProfile);
    },
};