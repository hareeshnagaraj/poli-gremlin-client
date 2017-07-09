// Set your API key to an environment variable 
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}
var fs = require('fs');
var Congress = require('propublica-congress-node');
var uuid = require('uuid');

// Global members
var client = new Congress(process.env.propublicakey);

var initializeWorkDirectory = function()
{
	var workDir = process.cwd() + '/work/';

	if (!fs.existsSync(workDir)){
		fs.mkdirSync(workDir);
	}

	workDir += uuid.v1();

	if (!fs.existsSync(workDir)){
		console.log('Creating work directory : ' + workDir);
		fs.mkdirSync(workDir);
	}

	return workDir;
}

// Retrieve information for a given congress session
// 102-115 for House, 80-115 for Senate
var populateCongressMembers = function(congressSeshNumber, chamber, workDir)
{
	var resp;

	if(chamber != 'house' && chamber != 'senate')
	{
		throw Error('Invalid chamber ' + chamber);
	}

	client.memberLists({
		congressNumber: congressSeshNumber,
		chamber: chamber
	}).then(function(res, error){

		var members = res['results'][0];
		// Write JSON file with all members for this particular congress
		if(workDir != null)
		{
			writeResponseFile(members, 'CongressMembers_'+congressSeshNumber+'_'+chamber, workDir)
		}

		// Enumerate the response
		console.dir(members, 5);
	});
};

// Write a file with the JSON response from ProPublica API
var writeResponseFile = function(data, apiname, dir)
{	
	var fileName = dir + '/' + apiname + '_' + uuid.v1() + '.json';
	console.log('Writing ' + fileName);

	var writeStream = fs.createWriteStream(fileName);
	writeStream.write(JSON.stringify(data));
	writeStream.end();
}

// Testing
var workDir = initializeWorkDirectory();
populateCongressMembers(115, 'house', workDir);
populateCongressMembers(115, 'senate', workDir);
