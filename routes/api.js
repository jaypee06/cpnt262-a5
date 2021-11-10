const express = require('express') // Run Express
const rout = express.Router() // Connect to `server.js`

// Connect to MongoDB
const mongoose = require('mongoose'); 
const { stringify } = require('querystring');

mongoose.connect(
  process.env.MONGODB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  )
  .then(function(){
    console.log('Connected to DB...')
  })
  .catch(function(err){
    console.log(err)
  });

// Step 1: Schema
const NBASchema = new mongoose.Schema({
    id: Number,
    title: String,
    Description: String,
    width: Number,
    height: Number,
    pathURL: String,
    linkURL: String,
    credit: String,
    creditURL: String,
})

const basketball = mongoose.model('Basketball', NBASchema)

const ball = require('../models/images')


rout.get('/info', async(req,res) =>{
  let items = await basketball.find()
  res.send(items)

})

rout.get('/info/:id', async(req, res) => {

  try {
    const items = await basketball.findOne({id: req.params.id}) 
    if (!items) {
      throw new Error()
    }
    res.send(items)
  } catch(err) {
    res.send({error: 'Data not found!!'})
  }

})

module.exports = rout


