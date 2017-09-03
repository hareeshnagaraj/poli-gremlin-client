// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}

const Promise = require('bluebird');
const fs = require('fs');
const gremlin = require('gremlin-client');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');

// Global members
// Make sure you have configured a local environment variable with the ProPublicaApi Key
// Update ~/.bash_profile with : export propublicakey=<yourkey>
const ProPublicaClient = new Congress(process.env.propublicakey);
const GremlinClient = gremlin.createClient(8182, '40.112.250.222');

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

	ProPublicaClient.memberLists({
		congressNumber: congressSeshNumber,
		chamber: chamber
	}).then(function(res, error){
		if(res['results'][0] != null){
			const data = res['results'][0];
			const members = data['members'];

			// Enumerate the response
			Promise.map(members, populateMemberInfo);
		}
	});
};

/*
 * Add a graph vertex for a given member of congress
 * 
 * House Member Properties
 * 
 * firstName
 * lastName
 * dateOfBirth
 * party
 * nextElection
 * totalVotes
 * missedVotes
 * phone
 * fax
 * state
 * district
 * missedVotesPercent
 * votesWithPartyPercent
 * domain
 * 
 * TODO: Senate Member Properties
 * */
const populateMemberInfo = function(memberData)
{
	var queryString = "graph.addVertex('firstName', x1, 'lastName', x2, 'dateOfBirth', x3, 'party', x4, 'nextElection', x5)";

	return new Promise(function (resolve, reject) {
		try
		{
			var queryPrefix = "graph.addVertex(";
			var querySuffix = ")";
			var queryBindings = {};
			var query = queryPrefix;
			var index = 0;

			Object.keys(memberData).forEach(
				function(key) 
					{
						if(key != "id" && memberData[key] != null)
						{
							index++;
							var bindingIdentifier = "x"+index;
							query += "'" + key + "'," + bindingIdentifier + ",";
							queryBindings[key] = memberData[key];
						}
			});

			query = query.substring(0, query.length - 1);
			query += querySuffix;
			console.log(query);
			console.log(queryBindings);

			// GremlinQuery({
			// 		string : queryString,
			// 		bindings : 
			// 			{ 
			// 				x1: memberData['first_name'],
			// 				x2: memberData['last_name'],
			// 				x3: memberData['date_of_birth'],
			// 				x4: memberData['party'],
			// 				x5: memberData['next_election']
			// 			}
			// 	});
				
			resolve();
		}
		catch(Exception)
		{
			reject();
		}
    }).catch((err)=>{ console.log(err); });
}

/**
 * Execute a gremlin query
 * Accepts an object with bindings and string properties
 *  var name = "Dean Kaplan";
	var queryString = "graph.addVertex('name', x1)";
	var queryBindings = { x1: name };
	var queryContainer = {
		string : queryString,
		bindings : queryBindings
	};
 */

const GremlinQuery = function(queryContainer)
{
	var queryString = queryContainer['string'];
	var queryBindings = queryContainer['bindings'];

    GremlinClient.execute(
	queryString,
	queryBindings,
	function(err, results) {
        if (!err) {
            console.dir(results, {depth: 5});
        }
        else{
            console.log("Error executing " + queryString);
        }
    });
}

// Testing
populateCongressMembers(115, 'house');


//populateCongressMembers(115, 'senate');
