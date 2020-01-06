const mongoose = require(mongoose)

var softwareSchema = new mongoose.Schema({
    name: string,
    type: string
})

var Software = mongoose.model('Software', softwareSchema)