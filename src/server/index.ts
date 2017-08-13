import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'
import * as path from 'path'
import * as spdy from 'spdy'

import {WelcomeController} from '../controllers'

const app = express()
const port: number = parseInt(process.env.PORT) || 3000

const options = {
    key: fs.readFileSync(__dirname + '/config/server.key'),
    cert:  fs.readFileSync(__dirname + '/config/server.crt'),
    spdy: {
      protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
      plain: true, //true: enables plain text data transfer over http/1.1, false: http/2 only
      ssl: true
    }
}

app.use(bodyParser.json())
app.use(errorHandler)
app.use(express.static(path.resolve(__dirname, '../../', 'public')));

app.get('/', (req: express.Request, res: express.Response) => {
  console.log('sup dawg')
  res.send('hello world!')
  // res.sendFile(path.resolve(__dirname, '../../', 'public', 'index.html'));
});

app.use('/welcome', WelcomeController);


function errorHandler(err: NodeJS.ErrnoException, req: express.Request, res: express.Response, next: Function): void {
  console.error('ERROR!', err)
}

function serverHandler(error: NodeJS.ErrnoException): void{
  if(error) throw `Error! ${error}`
  console.log('Listening on port: ', port)
}

console.log(app)
const server = spdy.createServer(options, app).listen(port, serverHandler)
// spdy.createServer(options, app).listen(port, serverHandler)
