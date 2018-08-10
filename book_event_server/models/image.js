const mongoose = require('mongoose')
const Schema = mongoose.Schema


const imageSchema = new Schema({
    image: String,
    description: String,
    ranking: Number,
    categoryId: String
})

module.exports = mongoose.model('Image', imageSchema)