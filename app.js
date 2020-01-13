const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const util = require('util')

const app = express()


/* Configure Variables */
require('dotenv').config()
const port = process.env.PORT || 8090

// MongoDB Variables
const mongoHost = process.env.MONGO_HOST
const mongoPort = process.env.MONGO_PORT || '27017'
const mongoDBName = process.env.MONGO_DATABASE
const mongoUser = process.env.MONGO_USER
const mongoPassword = process.env.MONGO_PASSWORD

const swagger = require('swagger-express-middleware');

const mongoURL = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`

console.log(mongoURL);
console.log(process.env.NODE_ENV)

app.enable('case sensitive routing')
app.enable('strict routing')

// HTTP Logging
app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

swagger('swagger.yaml', app, (_, middleware) => {

  app.use(middleware.CORS(),
          middleware.files()
  );

  const router = require('./routes/index.js')

  app.use(middleware.parseRequest(router))
  app.use(middleware.validateRequest(router))
  app.use(middleware.metadata())
  app.use('/v1', router)

  let data = new swagger.MemoryDataStore()
  data.save (
    new swagger.Resource('/v1/software/xyz', {name:'xyz', type:'optimizer'}),
    new swagger.Resource('/v1/software/test', {name:'test', type:'optimizer'}),
    new swagger.Resource('/v1/software/uvw', {name:'uvw', type:'system-manager'})
  )
  app.use(middleware.mock(data))

  app.use('*', function (req, res, next) {
    res.status(404).json({
      error: "Requested resource " + req.originalUrl + " does not exist"
    })
  })

  MongoClient.connect(mongoURL, { useUnifiedTopology: true }, function (err, client) {
    if (!err) {
      app.locals.mongoDB = client.db(mongoDBName)
      app.listen(port, function() {
        console.log("== Server is running on port", port)
      })
    } else {
      console.log(err)
    }
  })

})