const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Intregration= new Schema(
    {
        fx: { type: String, required: false },
        a: { type: String, required: false },
        b: { type: String, required: false },
        n: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Intregrations', Intregration)