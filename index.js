const mqtt_url = 'mqtt://m21.cloudmqtt.com';
var mqtt_options = {
    port: 00000,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'xxxxxxxx',
    password: 'xxxxxxxx',
  };

//const _ = require('lodash');
//const moment = require('moment');
var mqtt = require('mqtt');

console.log('=== IOT Test Project ===');

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const request = require('http');
var client = mqtt.connect(mqtt_url, mqtt_options);

client.on('connect', function() { // When connected
    console.log("MQTT Client connected!");
});

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
.get('/ifttt', (req, res) => {
    
    console.log('IFTTT action request!');
    if (req.query.command) {
        console.log('Command accepted: ' + req.query.command);
        if (client.connected) {
            client.publish('myhome/ifttt_command', req.query.command, function() {
                console.log("Message is published");
                client.end(); // Close the connection when published
              });
        } else {
            console.log("I cant send message while client is not connected :(");
        }

    } else {
        console.log('Command not found in GET query :(');
    }
    // https.get('https://85.235.193.90:880/radiokill', (resp) => {
    //     let data = '';
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //     resp.on('end', () => {
    //         console.log(JSON.parse(data).explanation);
    //     });
    // })
    // .on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
    res.send('OK');
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
