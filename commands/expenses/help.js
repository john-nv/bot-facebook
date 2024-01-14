const fs = require('fs').promises;
const { createReadStream } = require('fs');
// const nodeHtmlToImage = require('node-html-to-image');

module.exports = {
    name: 'help',
    aliases: [],
    category: 'expenses',
    utilisation: '{prefix}help',
    description: 'help',

    async execute(api, message, idProfile) {
        try {
            const help = `
/note (nội dung ghi chú) [thêm ghi chú mới]
/xoanote (id) [xóa theo id]
/xoanote all  [để xóa tất cả]
/shownote     [hiển thị note] *chưa ổn định với hình ảnh

/ping [kiểm tra bot]
            `
            await api.sendMessage(help, idProfile);
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