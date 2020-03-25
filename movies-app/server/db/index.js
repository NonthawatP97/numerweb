const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:123@cluster0-swpve.mongodb.net/Numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
//db.once(`open`,()=>console.log(`database is connect`))
module.exports = db