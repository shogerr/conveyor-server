module.exports = function (collectionName) {
  const router = require('express').Router()
  const ObjectId = require('mongodb').ObjectId;

  var _router = function (collectionName) {
    router.get('/', function(req, res) {
      console.log(collectionName)
      req.app.locals.mongoDB.collection(collectionName)
        .find()
        .toArray()
        .then((result) => {
          res.status(200).json(result)
        })
    })

    router.post('/', function(req, res) {
      console.log(collectionName)
      req.app.locals.mongoDB.collection(collectionName)
        .insertOne(req.body)
          .then((result) => {
            res.status(201).json({
              _id: result.insertedId
            })
          })
    })

    router.put('/:id', function(req, res) {
      const collection = req.app.locals.mongoDB.collection(collectionName)
      req.body.id = result._id
      collection.findOne({ _id: new ObjectId(req.params.id) }, req.body)
        .then((result) => {
          res.status(200).json(result)
        })
    })

    router.get('/:id', function(req, res, next) {
      const collection = req.app.locals.mongoDB.collection(collectionName)
      collection.findOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
          result.id = result._id
          res.status(200).json(result)
        }).catch(next)
    })

    router.delete('/:id', function(req, res) {
      const collection = req.app.locals.mongoDB.collection(collectionName)

      collection.deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
          res.status(200).json({
            _id: result.insertedId
          })
        }) 
    })

    return router
  }

  return {
    "route": _router(collectionName)
  }
};