const mongoose = require('mongoose')

const lapWiseTimingSchema = new mongoose.Schema({
    lap_number: mongoose.Schema.Types.Number,
    timings: mongoose.Schema.Types.Array
})

lapWiseTimingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Lap_Wise_Timing', lapWiseTimingSchema)