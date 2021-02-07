const express = require('express')
const path = require('path')
const app = express()
const http = require('http')

app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/chillilist', (req, res) => {
  let data = '';
  let backend = "http://chillibackend:8000/chillilist"
  console.log(backend);
  http.get(backend, (resp) => {

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log('end');
      res.send(data)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  console.log(data);
  console.log('outer');
  //return res.send(data)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(9000)
