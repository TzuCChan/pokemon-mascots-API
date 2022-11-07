const mongoose = require('mongoose')

const legendarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  legendaryType: {
    type: String,
    required: true
  },
  legendaryYear: {
    type: Date,
    require: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Legendary', legendarySchema)