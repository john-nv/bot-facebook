const login = require("facebook-chat-api")
const express = require('express')
const app = express()
require('dotenv').config()
const fs = require('fs')

const PORT = process.env.PORT || 2002
const { MESSAGES } = require('./config/constants')
const { errorCommand } = require('./config/utils/error')
const db = require('./config/db/mongodb')

const cookie = { appState: JSON.parse(fs.readFileSync('./cookie-fb.json', 'utf-8')) }

async function startServer() {
    try {
        db.connect()

        login(cookie, (err, api) => {
            if (err) return console.error(err)

            api.listenMqtt((err, message) => {
                if (err) return console.error(err.message)

                processMessage(api, message)
            })
        })
    } catch (error) {
        console.error(error)
    }
}

async function processMessage(api, message) {
    try {
        message.body = String(message.body)

        if (message.body === "undefined") return

        if (!message.body.startsWith(process.env.PREFIX)) {
            api.sendMessage(MESSAGES.CONFIRM_BOT, message.threadID)
            api.sendMessage(MESSAGES.HELP, message.threadID)
            return
        }

        const commandName = message.body.split(' ')[0].substring(process.env.PREFIX.length).toLowerCase()
        const commandFilePath = `./commands/expenses/${commandName}.js`

        try {
            const { name, execute } = await require(commandFilePath)
            if (name && execute) return execute(api, message.body.substring(process.env.PREFIX.length), message.threadID)

            api.sendMessage(MESSAGES.NOT_READY, message.threadID)
        } catch (error) {
            console.error(error.message)
            errorCommand(api, error, message.threadID)
        }
    } catch (error) {
        console.error(error.message)
        errorCommand(api, error, message.threadID)
    }
}

startServer()

app.listen(PORT, () => {
    console.info(`Server is running on port => ${PORT}`)
})
