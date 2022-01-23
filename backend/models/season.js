const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
    year: String,
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
})
seasonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Season', seasonSchema)