const express = require('express')
const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')
// const fs = require('fs')
// const server = require('spdy').createServer(options,app).listen(port,serverHandler)
const server = require('http').Server(app)

const port = process.env.PORT || 3000

const eventHandlers = require('./eventHandlers')

app.enable('trust proxy');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(errorHandler)

// const options = {
//     key: fs.readFileSync(__dirname + '/config/server.key'),
//     cert:  fs.readFileSync(__dirname + '/config/server.crt'),
//     spdy: {
//       protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
//       plain: false,
//       //plain: false, //true: enables plain text data transfer over http/1.1, false: http/2 only
//       ssl: true
//     }
// }

app.get('/', (req, res) => {
  console.log('sup dawg')
  // res.send('hello world!')
  res.sendFile(path.resolve(__dirname, '../', 'public', 'index.html'));
});

app.use('/test', eventHandlers)

function errorHandler(err,req,res,next){
  console.error(err)
}

function serverHandler() {
  console.log(`listening on funky port: ${port}`)
}

server.listen(port, serverHandler)
