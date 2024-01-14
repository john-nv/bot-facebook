require('dotenv').config()

const msgAuto = '[Tin nhắn tự động]'
const contact = process.env.CONTACT ? ` Hãy liên hệ ${process.env.CONTACT}` : ''

module.exports = {
    MESSAGES: {
        CONFIRM_BOT: `${msgAuto} - Facebook này hiện tại được sử dụng để làm BOT !${contact}`,
        HELP: `${process.env.PREFIX}help - để tìm hiểu về BOT`,
        ERROR_COMMAND: 'Đã xảy ra lỗi khi chạy lệnh',
        NOT_FOUND: 'Lệnh không tìm thấy',
        NOT_READY: 'Lệnh đang được phát triển hoặc bảo trì',

        FORMAT: {
            LEVEL_1: 'Vui lòng nhập đầy đủ cú pháp',
            LEVEL_2: 'Cú pháp sai hoặc không đúng định dạng',
            LEVEL_3: '',
        },

        SAVE: {
            SUCCESS: 'Lưu dữ liệu thành công',
            FALL: 'Lỗi khi lưu. Vui lòng thao tác lại đúng cách',
        },

        DELETE: {
            SUCCESS: 'Xóa dữ liệu thành công',
            FALL: 'Lỗi khi xóa. Vui lòng thao tác lại đúng cách',
        },

        SHOW: {
            SUCCESS: '',
            NOT_FOUND: 'Không có dữ liệu nào được tìm thấy',
        }
    }
};