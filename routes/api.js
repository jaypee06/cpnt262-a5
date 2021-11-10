const express = require('express') // Import Express
const rout = express.Router() // Importing router to `server.js`

// Connection to MongoDB
const mongoose = require('mongoose'); 

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

// Create new Schema
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

//Create new mongoose model
const basketball = mongoose.model('Basketball', NBASchema)


//Show API from database
rout.get('/info/data', async(req, res) =>{

  let items = await basketball.find()
  res.send(items)

})

//Searching/retrieving data from database using ID
rout.get('/info/data/:id', async(req, res) => {

  try {
    const items = await basketball.findOne({id: req.params.id}) 

    if (!items) {
      throw new Error()
    }

    res.send(items)

  //Error Occur if endpoint is not existing
  } catch(err) {
    res.send({error:'Data not found!!'})
  }

})

//exporting api.js
module.exports = rout


