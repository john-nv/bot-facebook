const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
require('dotenv').config()

async function connect() {
    try {
        mongoose.connect(process.env.CONNECT_MONGODB, {
            // auth: {
            //     username: '',
            //     password: '',
            // },
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.info(`=> connect database ${process.env.CONNECT_MONGODB} success`))
            .catch(err => console.error('🛠🛠🛠 : ' + err));
    } catch (error) {
        console.info(`=> connect DB ${process.env.CONNECT_MONGODB} failure`);
        console.error(error);
    }
}

module.exports = { connect };