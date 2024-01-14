const fs = require('fs').promises;
const { createReadStream } = require('fs');
// const nodeHtmlToImage = require('node-html-to-image');

module.exports = {
    name: 'ping',
    aliases: [],
    category: 'expenses',
    utilisation: '{prefix}ping',
    description: 'Ping BOT',

    async execute(api, message, idProfile) {
        try {
            // const nameFile = `${__dirname}/${Date.now()}${idProfile}.png`;
            const nameFile = `${__dirname}/pong.png`;

            // await nodeHtmlToImage({
            //     output: nameFile,
            //     html: pong(),
            // });

            const attachment = createReadStream(nameFile);
            await api.sendMessage({ body: '', attachment }, idProfile);
            // await fs.unlink(nameFile);
        } catch (error) {
            console.error('Error:', error);
            await api.sendMessage('Error occurred while creating image', idProfile);
        }
    },
};

// function pong() {
//     return `<html>

//     <head>
//         <style>
//             * {
//                 margin: 0;
//                 padding: 0;
//                 box-sizing: border-box;
//             }
    
//             body {
//                 height: 100vh;
//                 margin: 0;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//             }
    
//             .div {
//                 height: 200px;
//                 width: 500px;
//                 background-color: antiquewhite;
//                 border-radius: 11px;
//                 text-align: center;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 justify-content: center;
//                 padding: 20px;
//             }
    
//             h1 {
//                 margin-bottom: 20px;
//             }
//         </style>
//     </head>
    
//     <body>
//         <div class="div">
//             <h1>🟢 PONG</h1>
//             <h1>BOT đang hoạt động!</h1>
//         </div>
//     </body>
    
//     </html>`
// }