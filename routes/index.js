const router = module.exports = require('express').Router()

router.use('/software', require('./software').router)