const mongoose = require('mongoose')

const constructorNameSchema = new mongoose.Schema({
    name: String,
    drivers: Array,
    season_end_position: Array,
    total_points: Array,
    points_per_race: Array,
    nationality: String
})
constructorNameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Constructor_Name', constructorNameSchema)