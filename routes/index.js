//import router_ from './software'
const router = module.exports = require('express').Router()

//var software = require("./software")
//router.use('/software', software.router)

var Endpoint = require("./endpoint")

var p = new Endpoint("scripts")
router.use('/scripts', p.route)

var o = new Endpoint("software")
router.use('/software', o.route)

