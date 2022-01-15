const mongoose = require('mongoose')

const constructorNameSchema = new mongoose.Schema({
    name: String,
    drivers: Array,
    season_end_position: Number,
    total_points: Number,
    points_per_race: Array
})
constructorNameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Constructor_Name', constructorNameSchema)