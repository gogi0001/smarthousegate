const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => {
      console.log('Somebody requested root!');
      res.send('Hello there dude!');
  })
  .get('/action', (req, res) => {
    console.log('Ouch! Is seems Google Actions ACTS!');
    res.send('OK');
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
