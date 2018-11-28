const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const request = require('https');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => {
      console.log('Somebody requested root!');
      res.send('Hello there dude!');
  })
  .get('/pp', (req, res) => {
    console.log('Somebody requested PrivacyPolicy!');
    res.send('Privacy Policy: do not push anything!');
})
.get('/action', (req, res) => {
    console.log('Ouch! Is seems Google Actions ACTS!');
    // request('https://85.235.193.90:880/radiokill', { json: true }, (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     console.log(body.url);
    //     console.log(body.explanation);
    //   });
    res.send('OK');
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
