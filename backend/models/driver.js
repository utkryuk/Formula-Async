const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    name: String,
    constructorName: String,
    season_end_position: Number,
    total_points: Number,
    points_per_race: Array,
    country: String
})
driverSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Driver', driverSchema)