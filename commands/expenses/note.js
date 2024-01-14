const fs = require('fs').promises;
const { createReadStream } = require('fs');
// const nodeHtmlToImage = require('node-html-to-image');

const { note } = require('../../config/schema')
const { MESSAGES } = require('../../config/constants')

module.exports = {
    name: 'note',
    aliases: [],
    category: 'expenses',
    utilisation: '{prefix}note',
    description: 'Thêm ghi chú',

    async execute(api, message, idProfile) {
        message = String(message.split(/\s*note\s+/)[1])
        if (message === 'undefined') return api.sendMessage(MESSAGES.FORMAT.LEVEL_1, idProfile)
        try {
            let noteNew = {
                user: idProfile,
                description: message
            }
            noteNew = await note.create(noteNew)
            message = noteNew ? MESSAGES.SAVE.SUCCESS : MESSAGES.SAVE.FALL
            api.sendMessage(message, idProfile)
        } catch (error) {
            console.error('Error:', error)
            await api.sendMessage(error.message, idProfile)
        }
    },
}
