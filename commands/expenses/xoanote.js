const fs = require('fs').promises;
const { createReadStream } = require('fs');
// const nodeHtmlToImage = require('node-html-to-image');

const { note } = require('../../config/schema')
const { MESSAGES } = require('../../config/constants')

module.exports = {
    name: 'xoanote',
    aliases: [],
    category: 'expenses',
    utilisation: '{prefix}xoanote',
    description: 'Xóa ghi chú',

    async execute(api, message, idProfile) {
        let id = message.split(/\s*note\s+/)[1]
        let noteDel = null
        let msg = MESSAGES.DELETE.FALL
        try {
            if (id.toLowerCase() === "all") {
                noteDel = await note.deleteMany({ user: idProfile })
            } else {
                id = parseInt(id)
                if (isNaN(id)) return api.sendMessage(MESSAGES.FORMAT.LEVEL_2, idProfile)
                noteDel = await note.deleteOne({ user: idProfile, id })
            }

            msg = noteDel.deletedCount ? MESSAGES.DELETE.SUCCESS : MESSAGES.DELETE.FALL
            api.sendMessage(msg, idProfile)
        } catch (error) {
            console.error('Error:', error)
            await api.sendMessage(error.message, idProfile)
        }
    },
}
