const router = require('express').Router()
const ObjectId = require('mongodb').ObjectId;

router.get('/', function(req, res) {
  req.app.locals.mongoDB.collection('software')
    .find()
    .toArray()
    .then((result) => {
      res.status(200).json(result)
    })
})

router.post('/', function(req, res) {
  const collection = req.app.locals.mongoDB.collection('software')

  //console.log(req.swagger.api.definitions.software)
  req.body.id = req.body.id_

  collection.insertOne(req.body)
    .then((result) => {
      res.status(201).json({
        _id: result.insertedId
      })
    })
})

router.put('/:id', function(req, res) {
  const collection = req.app.locals.mongoDB.collection('software')
  collection.findOne({ _id: new ObjectId(req.params.id) }, req.body)
    .then((result) => {
      result.id = result._id
      console.log(result)
      res.status(200).json(result)
    })
})

router.get('/:id', function(req, res) {
  const collection = req.app.locals.mongoDB.collection('software')
  req.body._id = 
  collection.findOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      result.id = result._id
      console.log(result)
      res.status(200).json(result)
    })
})

router.delete('/:id', function(req, res) {
  const collection = req.app.locals.mongoDB.collection('software')

  collection.deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json({
        _id: result.insertedId
      })
    }) 
})

exports.router = router;
