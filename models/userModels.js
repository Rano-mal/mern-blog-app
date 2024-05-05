const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name: String,
    articleName: String
})

module.exports = mongoose.model("User", userSchema)