const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lessonSchema = new Schema({
    date: Date,
    time: {
        type: String,
        enum: ['AM', 'PM']
    },
    instructor: {
        type: String,
        default: undefined
    },
    students: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking'
    }]
}, {
    timestamps: true
})

const Lesson = mongoose.model('Lesson', lessonSchema)
module.exports = Lesson