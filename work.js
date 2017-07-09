// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}

const Promise = require('bluebird');
const fs = require('fs');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');

// Global members
const client = new Congress(process.env.propublicakey);
let globalWorkDir;

const initializeWorkDirectory = function()
{
	let workDir = process.cwd() + '/work/';

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
const populateCongressMembers = function(congressSeshNumber, chamber, workDir)
{

	if(chamber != 'house' && chamber != 'senate')
	{
		throw Error('Invalid chamber ' + chamber);
	}

	client.memberLists({
		congressNumber: congressSeshNumber,
		chamber: chamber
	}).then(function(res, error){
		const data = res['results'][0];
		// Write JSON file with all members for this particular congress
		if(workDir != null)
		{
			writeResponseFile(data, 'CongressMembers_'+congressSeshNumber+'_'+chamber, workDir)
		}

		const members = data['members'];
		// Enumerate the response
		Promise.map(members, populateMemberInfo);
	});
};

const populateMemberInfo = function(x)
{
	client.memberBioAndRoles({
		memberId: x['id']
	}).then(function(res, error){
		const data = res['results'][0];
		const apiName = 'Member_' + x['id'] + '_' + x['first_name'] + x['last_name'] + '_' + uuid.v1();
		writeResponseFile(data, apiName, globalWorkDir);
	})
	.catch((err => console.error(err)))
}

// Write a file with the JSON response from ProPublica API
const writeResponseFile = function(data, apiname, dir)
{
	const fileName = dir + '/' + apiname + '_' + uuid.v1() + '.json';
	console.log('Writing ' + fileName);

	const writeStream = fs.createWriteStream(fileName);
	writeStream.write(JSON.stringify(data));
	writeStream.end();
}

// Testing
globalWorkDir = initializeWorkDirectory();
populateCongressMembers(115, 'house', globalWorkDir);
populateCongressMembers(115, 'senate', globalWorkDir);
