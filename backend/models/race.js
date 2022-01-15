const mongoose = require('mongoose')

const raceSchema = new mongoose.Schema({
    circuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circuit'
    },
    date: mongoose.Schema.Types.Date,
    lap_wise_timing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lap_Wise_Timing'
    }
})

raceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Race', raceSchema)