// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}

const Promise = require('bluebird');
const fs = require('fs');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');

// Global members
const client = new Congress(process.env.propublicakey);

// Sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Retrieve information for a given congress session
// 102-115 for House, 80-115 for Senate
const populateCongressMembers = function(congressSeshNumber, chamber)
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
		const members = data['members'];

		// Enumerate the response
		Promise.map(members, populateMemberInfo);
	});
};

const populateMemberInfo = function(x)
{
	// Get delay
    var delay = (Math.floor(Math.random() * 800)) + 100;

	sleep(delay).then(()=>{

		console.log(x);

		// 9/2/17
		// Temporarily removing the additional detail requests

		// client.memberBioAndRoles({
		// 	memberId: x['id']
		// 	}).then(function(res, error){
		// 		const data = res['results'][0];
		// 		console.log(res);
		// 	})
		// 	.catch((err => console.error(err)))
	});
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

console.log(process.env.propublicakey);

// Testing
console.log("Populating house members");
populateCongressMembers(115, 'house');

//populateCongressMembers(115, 'senate');
