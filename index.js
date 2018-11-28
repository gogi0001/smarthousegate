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
    https.get('https://85.235.193.90:880/radiokill', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
    });
    res.send('OK');
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
