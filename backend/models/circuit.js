const mongoose = require('mongoose')

const circuitSchema = new mongoose.Schema({
    name: String,
    lat: String,
    long: String,
    city: String,
    country: String
})

circuitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Circuit', circuitSchema)