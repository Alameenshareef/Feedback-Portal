const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text: String,
    rating: {type: Number, min: 1, max: 5},
    image: String,
    comment: String,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Feedback',feedbackSchema)