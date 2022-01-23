const mongoose = require('mongoose')

const seasonsSchema = new mongoose.Schema({
    seasons: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    }
})

seasonsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Seasons', seasonsSchema)