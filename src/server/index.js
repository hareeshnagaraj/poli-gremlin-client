var app = require('express')();
var bodyParser = require('body-parser');
var fs = require('fs');
var spdy = require('spdy');
var port = process.env.PORT || 3000;
function greeter(person) {
    return "Hello " + person;
}
console.log(greeter('dawgero'));
app.get('/', function (req, res, next) { return res.send('sup dawg'); });
app.use(bodyParser.json());
app.use(errorHandler);
function errorHandler(err, req, res, next) {
    console.error(err);
}
function serverHandler(err) {
    if (err)
        return console.error('Error! ', err);
    console.log('Listening on port: ', port);
}
var options = {
    key: fs.readFileSync(__dirname + '/config/server.key'),
    cert: fs.readFileSync(__dirname + '/config/server.crt')
};
var server = spdy.createServer(options, app).listen(port, serverHandler);
