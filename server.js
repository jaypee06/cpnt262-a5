/******************/
/* Import Modules */
/******************/

const dotenv = require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.static('public'))

//Route exported from api.js file
const api = require('./routes/api')
app.use(api)


app.use((req, res) => {

  //Error occur when the endpoint starts wtih /info
  if (req.url.startsWith('/info')) {
    res.status(404)
    res.send({error:'File Not Found'})
  
  //Error occur when first endpoint is not existing
  } else {
    res.status(404)
    res.redirect('404.html')
   
  }
});

// Start server
const PORT = process.env.PORT;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});