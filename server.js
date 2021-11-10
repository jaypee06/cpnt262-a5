/******************/
/* Import Modules */
/******************/

const dotenv = require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.static('public'))


const api = require('./routes/api')
app.use(api)
app.use((req, res) => {

  if (req.url.startsWith('/info')) {
    res.status(404)
    res.send({error:'File Not Found'})

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