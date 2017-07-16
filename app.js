// Populate a JanusGraph server with data pulled from ProPublica API
// Repo: https://github.com/hareeshnagaraj/propublica-api-population

// Process command line arguments
const argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const gremlin = require('gremlin-client');
const Promise = require('bluebird');

const args = argv['_'];
const populate = 'populate';
const house = 'house';
const senate = 'senate';

// Will open a WebSocket to ws://localhost:8182 by default 
const client = gremlin.createClient();

const PopulateSenateMembers = function(jsonFilePath){
    var json = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    var congressNum = json['congress'];
    var senateMembers = json['members'];
    var queries = [];
    
    for(var i = 0; i < senateMembers.length; i++){
        var clientQueryStr = 'graph.addVertex(' + GetSenateMemberVertexQuery(senateMembers[i]) + ');';
        queries.push(clientQueryStr);
    }

    Promise.map(queries, GremlinQuery);
}

// Get query for senate member
const GetSenateMemberVertexQuery = function(currentMember)
{
    var firstName = currentMember['first_name'];
    var lastName = currentMember['last_name'];
    var vertexName = firstName + '-' + lastName;

    var queryStr = '';
    for(var key in currentMember){
        queryStr += ("\"" + key + "\"" + ',' + "\"" + currentMember[key] + "\"" + ',');
    }

    queryStr = queryStr.slice(0, -1);
    return queryStr;
}

// Execute gremlin query
const GremlinQuery = function(query)
{
    client.execute(query, function(err, results) {
        if (!err) {
            console.log(results) // Handle an array of results 
        }
        else{
            console.log("Error executing " + query);
        }
    });
}

// var vertexQuery = client.stream('g.V()');
 
// vertexQuery.on('data', function(result) {
//   console.log(result);
//   removeVertices(result['properties']);
// });
 
// vertexQuery.on('end', function() {
//   console.log("All results fetched");
// });

// function removeVertices(nodes)
// {
//   console.log(nodes);
// }

// 2 graphs
// 1 senate, 1 house
// Start w/senate for ease of use


// Command line parsing
if(args[0] == populate){

    if(args.length < 3)
    {
        throw new Error('Incorrect usage. Ex: node app.js populate [house/senate] [path to json]');
    }
    else if (args[1] != house && args[1] != senate)
    {
        throw new Error('Incorrect usage. Ex: node app.js populate [house/senate] [path to json]');        
    }

    var chamber = args[1];
    var file = args[2];

    if (!fs.existsSync(file)) {
        throw new Error('Could not find file : ' + file);        
    }

    if (chamber == senate){
        PopulateSenateMembers(file);
    }

    console.log('Populating ' + chamber + ' from : ' + file);
}