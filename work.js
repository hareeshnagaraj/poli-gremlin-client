// Set your API key to an environment variable 
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}
var fs = require('fs');
var Congress = require('propublica-congress-node');
var client = new Congress(process.env.propublicakey);

client.memberLists({
	congressNumber: '114',
	chamber: 'house'
    }).then(function(res){
	console.dir(res, {depth:5});
    });



