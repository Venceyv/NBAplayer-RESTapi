const mongoose = require('mongoose')

const NBAplayerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    default: null
  },
  injury: {
    type: Boolean,
    required: true,
    default: null
  },
  championship: {
    type: Number,
    // required: true,
    default: null
  },
})

module.exports = mongoose.model('NBAplayer', NBAplayerSchema)
