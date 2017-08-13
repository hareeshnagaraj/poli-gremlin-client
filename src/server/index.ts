const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const spdy = require('spdy')

const app: Express.Application = express();
const port: number = parseInt(process.env.PORT) || 3000;

const WelcomeController = require('../controllers')

const options = {
    key: fs.readFileSync(__dirname + '/config/server.key'),
    cert:  fs.readFileSync(__dirname + '/config/server.crt'),
    spdy: {
      protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
      plain: false,
    }
}

const server = spdy.createServer(options,app).listen(port,serverHandler)


app.use(bodyParser.json())
app.use(errorHandler)
app.use('/welcome', WelcomeController);


function greeter(person: string): string{
  return `Hello ${person}`
}

console.log(greeter('Mike'))


app.get('/', (req: Express.Request, res: Express.Response, next: Function): void => {
  console.log(res)
  // res.send('sup dawg')
})

function errorHandler(err: NodeJS.ErrnoException, req: Express.Request, res: Express.Response, next: Function): void {
  console.error(err)
}

function serverHandler(error: NodeJS.ErrnoException): void{
  if(error) console.error(error)
  console.log('Listening on port: ', port)
}
