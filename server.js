/******************/
/* Import Modules */
/******************/

const dotenv = require('dotenv').config();
const express = require('express')
const app = express()

// static server
app.use(express.static('public'))

/*****************/
/* Define routes */
/*****************/

const api = require('./routes/api')
app.use('/api', api)


app.use((req, res) => {

  if (req.url.startsWith('/api')) {
    res.status(404)
    res.send({error:'Url Not Found'})

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