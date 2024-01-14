const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { getDateToday } = require('../utils/moment.util')

const noteSchema = new Schema({
    id: {
        type: Number,
        autoIncrement: true,
        startAt: 1,
        incrementBy: 1,
    },
    date: String,
    user: String,
    description: String,
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    timezone: 'Asia/Ho_Chi_Minh'
})

noteSchema.pre('save', async function (next) {
    try {
        const noteSearch = await this.constructor.findOne({ user: this.user }).sort({ createdAt: -1 })
        this.id = !noteSearch ? 1 : noteSearch.id + 1
        this.date = getDateToday()
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('notes', noteSchema)
