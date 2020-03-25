const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Differentiation= new Schema(
    {
        fx: { type: String, required: false },
        x: { type: String, required: false },
        h: { type: String, required: false },
        d: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Differentiations', Differentiation)