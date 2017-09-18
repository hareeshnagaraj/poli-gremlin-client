// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}
const Promise = require('bluebird');
const fs = require('fs');
const gremlin = require('gremlin-client');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');
const argv = require('minimist')(process.argv.slice(2));

// Command line related constants
const args = argv['_'];
const populate = 'populate';
const house = 'house';
const senate = 'senate';
const addvotingwithedge = 'addvotingwithedge';

let congressSessionId = 0;

// Global members
// Make sure you have configured a local environment variable with the ProPublicaApi Key
// Update ~/.bash_profile with : export propublicakey=<yourkey>
const ProPublicaClient = new Congress(process.env.propublicakey);
const GremlinClient = gremlin.createClient(8182, '40.112.250.222');

let listMode = false;

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
	return new Promise(function (resolve, reject) {
		try
		{
			var queryPrefix = "graph.addVertex(";
			var querySuffix = ")";
			var queryBindings = {};
			var query = queryPrefix;
			var index = 0;
			memberData['sessionId'] = congressSessionId;

			Object.keys(memberData).forEach(
				function(key) 
					{
						if(key != "id" && memberData[key] != null)
						{
							index++;
							var bindingIdentifier = "x"+index;
							query += "'" + key + "'," + bindingIdentifier + ",";
							queryBindings[bindingIdentifier] = encodeURIComponent(memberData[key]);
						}
			});

			query = query.substring(0, query.length - 1);
			query += querySuffix;

			if(listMode)
			{
				console.log("---------- LISTMODE ----------")
				console.log(memberData);
				console.log("Gremlin Query: \n");
				console.log(query);
				console.log("Bindings: \n");
				console.log(queryBindings);
				console.log("---------- /LISTMODE ----------\N")
				return;
			}
			
			// Check if entry already exists

			console.log("Executing Gremlin Query: \n");
			console.log(query);
			console.log("Bindings: \n");
			console.log(queryBindings);

			GremlinQuery({ string: query, bindings : queryBindings });

			resolve();
		}
		catch(e)
		{
			console.log(e);
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

const GremlinQueryResp = function(queryContainer)
{
	var queryString = queryContainer['string'];
	var queryBindings = queryContainer['bindings'];

    GremlinClient.execute(
	queryString,
	queryBindings,
	function(err, results) {
        if (!err) {
            return results;
        }
        else{
            console.log("Error executing " + queryString);
			return null;
        }
    });
}

// EX: 
/*
	node app.js populate senate congress#
	node app.js populate senate 115 	<-- Most recent congress session (2017)
	node app.js populate house 115

	Additional Flags:
	-l : list mode - lists response from API and does not populate graph
		  node app.js populate house 115 list
 */
if(args[0] == populate){

    if(args.length < 3)
    {
		console.log(args.length);
        throw new Error('Incorrect usage. 2 Ex: node app.js populate [house/senate] [congress session #]');
    }
    else if (args[1] != house && args[1] != senate)
    {
        throw new Error('Incorrect usage. Ex: node app.js populate [house/senate] [congress session #]');        
    }

    var chamber = args[1];
    congressSessionId = args[2];

	if(args.length == 4 && args[3] == "list")
	{
		listMode = true;
	}

    console.log('Populating ' + chamber + ' Session : ' + congressSessionId);
	populateCongressMembers(parseInt(congressSessionId), chamber);
}

// EX: 
/*
	node app.js addvotingwithedge [outgoinghousememberid]
 */
if(args[0] == addvotingwithedge)
{

}