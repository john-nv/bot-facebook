const fs = require('fs').promises;
const { createReadStream } = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const moment = require('moment')

const { note } = require('../../config/schema')
const { MESSAGES } = require('../../config/constants')
const { formatDate } = require('../../config/utils/moment.util')

module.exports = {
    name: 'shownote',
    aliases: [],
    category: 'expenses',
    utilisation: '{prefix}shownote',
    description: 'Xóa ghi chú',

    async execute(api, message, idProfile) {
        try {
            const noteList = await note.find({ user: idProfile })

            if (!noteList || noteList.length < 1) return api.sendMessage(MESSAGES.SHOW.NOT_FOUND, idProfile)
            const nameFile = await renderImage(noteList, idProfile)
            console.log(nameFile)
            const attachment = createReadStream(nameFile);
            await api.sendMessage({ body: '', attachment }, idProfile);
            await fs.unlink(nameFile);
        } catch (error) {
            console.error('Error:', error)
            await api.sendMessage(error.message, idProfile)
        }
    },
}


async function renderImage(items, idProfile) {
    const nameFile = `${__dirname}/${Date.now()}_${idProfile}.png`;

    await nodeHtmlToImage({
        output: nameFile,
        html: renderHtml(items),
        puppeteerArgs: { args: ['--no-sandbox', '--disable-setuid-sandbox'], defaultViewport: { width: 1920, height: 1080 } },
    });

    return nameFile;
}

function renderHtml(items) {
    let itemHtml = '';
    for (let i = 0; i < items.length; i++) {
        items[i].date = formatDate(items[i].createdAt);
        itemHtml += `
        <div class="item">
            <div style="display: flex;">
                <h5>📅 ${items[i].date}</h5>
                <span style="margin-left: 10px;">ID: ${items[i].id}</span>
            </div>
            <textarea>${items[i].description}</textarea>
        </div>
    `;
    }

    return `
    <html>
    <head>
        <style>
            * {margin: 0;padding: 0; box-sizing: border-box; }
            body { background-color: rgb(219, 218, 218); }
            #main { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; margin: 5px; }
            .item { width: 370px; height: 250px; background-color: white; margin: 2px; border-radius: 7px; padding: 5px; }
            textarea { border: none; padding-top: 5px; font-size: 14px; overflow-y: hidden; width: 100%; height: 90%; }
        </style>
    </head>
    <body>
        <div id="main">${itemHtml}</div>
    </body>
    </html>`;
}