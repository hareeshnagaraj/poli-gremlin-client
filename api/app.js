// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicakey={your key}
const fs = require('fs');
const gremlin = require('gremlin-client');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');
const argv = require('minimist')(process.argv.slice(2));
const util = require('util');
const most = require('most');


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
const populateCongressMemberNodes = function (congressSeshNumber, chamber) {

	if (chamber != 'house' && chamber != 'senate') {
		throw Error('Invalid chamber ' + chamber);
	}

	ProPublicaClient.memberLists({
		'congress-number': congressSeshNumber,
		'chamber': chamber
	}).then(function (res, error) {
		if (res['results'][0] != null) {
			const data = res['results'][0];
			const members = data['members'];

			// Enumerate the response
			Promise.map(members, addMemberNode);
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
const addMemberNode = function (memberData) {
	console.log(memberData);
	return new Promise(function (resolve, reject) {
		try {
			var queryPrefix = "graph.addVertex(";
			var querySuffix = ")";
			var queryBindings = {};
			var query = queryPrefix;
			var index = 0;
			memberData['sessionId'] = congressSessionId;

			Object.keys(memberData).forEach(
				function (key) {
					if (memberData[key] != null) {
						index++;
						var bindingIdentifier = "x" + index;
						query += "'" + key + "'," + bindingIdentifier + ",";
						queryBindings[bindingIdentifier] = encodeURIComponent(memberData[key]);
					}
				});

			query = query.substring(0, query.length - 1);
			query += querySuffix;

			if (listMode) {
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

			GremlinQuery({
				string: query,
				bindings: queryBindings
			}, (data)=>{ console.dir(data, {depth:5})});

			resolve();
		} catch (e) {
			console.log(e);
			reject();
		}

	}).catch((err) => {
		console.log(err);
	});
}

/**
 * addVotingWithEdge - Add edges between each member of congress representing the % they vote together
 * https://projects.propublica.org/api-docs/congress-api/members/#compare-two-members-vote-positions
 * @param {*} data 
 */
const addVotingWithEdge = function (member, allMembers, congressChamber, congressNumber) {

	var id = member.properties.id[0].value;
	var name = member.properties.first_name[0].value + ' ' + member.properties.last_name[0].value

	return most.from(allMembers)
			   .filter((mem)=>{
				   return mem.properties != null && 
				   			mem.properties.id != null &&
							mem.properties.first_name != null &&
							mem.properties.last_name != null;
			    })
			   .map(otherMemberNode => {
					return most.just(otherMemberNode)
						.delay(Math.random() * 6000000)
						.map(x => {
							return most.just(x)
										.observe((x) => {
															var otherMemberId =
																x.properties.id[0].value;

															var otherMemberName =
																`${x.properties.first_name[0].value} ${x.properties.last_name[0].value}`;

															ProPublicaClient.memberVoteComparison({
																'member-id-1': id,
																'member-id-2': otherMemberId,
																'congress-number': congressNumber,
																'chamber': congressChamber
															})
															.then(function (res, error) {
																if (error != null) {
																	console.log(error);
																}

																if (res == undefined) {
																	if (error) {
																		console.log(error)
																	}
																	return;
																}

																if (res['results'][0] != null) {
																	var data = res['results'][0];
																	var commonVotes = data.common_votes;
																	var disagreeVotes = data.disagree_votes;
																	var agreePercent = data.agree_percent;
																	var disagreePercent = data.disagree_percent;
																	var returnValue = (`${name} // ${otherMemberName}. Common votes : ${commonVotes}, Disagree votes : ${disagreeVotes}, Agree % : ${agreePercent}, Disagree % ${disagreePercent}`);
																	console.log(returnValue);
																	return returnValue;
																}
														});
										});
						});
				});
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

const GremlinQuery = function (queryContainer, dataFn) {
	var queryString = queryContainer['string'];
	var queryBindings = queryContainer['bindings'];

	GremlinClient.execute(
		queryString,
		queryBindings,
		(err, results) => {
			if (!err) {
				dataFn(results);
			} else {
				console.log("Error executing " + queryString);
			}
		});
}


if(args.length == 0)
{
	console.log("Commands:");
	console.log("node app.js populate [house/senate] [congress session #]");
	console.log("node app.js addvotingwithedge [house/senate] [congress session #]");
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
if (args[0] == populate) {

	if (args.length < 3) {
		console.log(args.length);
		throw new Error('Incorrect usage. 2 Ex: node app.js populate [house/senate] [congress session #]');
	} else if (args[1] != house && args[1] != senate) {
		throw new Error('Incorrect usage. Ex: node app.js populate [house/senate] [congress session #]');
	}

	var chamber = args[1];
	congressSessionId = args[2];

	if (args.length == 4 && args[3] == "list") {
		listMode = true;
	}

	console.log('Populating ' + chamber + ' Session : ' + congressSessionId);
	populateCongressMemberNodes(parseInt(congressSessionId), chamber);
}

// EX: 
/*
	node app.js addvotingwithedge [chamber] [congressNumber]
	node app.js addvotingwithedge house 115

 */
if (args[0] == addvotingwithedge) {

	if (args.length < 3) {
		console.log(args.length);
		throw new Error('Incorrect usage. 2 Ex: node app.js addvotingwithedge [house/senate] [congress session #]');
	} else if (args[1] != house && args[1] != senate) {
		throw new Error('Incorrect usage. Ex: node addvotingwithedge house 115');
	}

	var chamber = args[1];
	congressSessionId = args[2];

	// ProPublicaClient.memberVoteComparison({
	// 	'member-id-1' : 'B001288',
	// 	'member-id-2': 'T000476',
	// 	'congress-number': congressSessionId,
	// 	'chamber': chamber
	// }).then(function (res, error) {
	// 	console.log(res);
	// 	if (res['results'][0] != null)
	// 	{
			
	// 	}
	// });

	var queryBindings = {};

	GremlinQuery({
		string: "g.V()",
		bindings: queryBindings
	},
	(allNodes) => {

		most.from(allNodes)
			.filter((node)=>{
				return node.properties != null && node.properties.id != null;
			})
			.map((node)=>{
				return addVotingWithEdge(node, allNodes, chamber, congressSessionId);
			})
			.flatMap((s)=>{
				return s;
			})
			.forEach((x)=>{

				x.observe((y)=>{
					most.fromPromise(y)
						.observe((x)=>{
							console.log(x);
						});
				});
				// x.then(function(result){
				// 	console.log(x);
				// });
			})
			.catch((e)=>{
				console.log(e);
			});
	});
}