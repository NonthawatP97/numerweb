const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        fx: { type: String, required: false },
        xl: { type: String, required: false },
        xr: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)