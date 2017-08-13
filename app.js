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
const committees = 'committees';

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

// Finds corresponding json file for every member returned
// by g.V() query for all vertices
const FindCorrespondingMemberJsonFiles = function(allMemberData, jsonDir)
{
    var queries = [];
    for(var i = 0; i < allMemberData.length; i++) {
        var firstName = allMemberData[i].properties['first_name'][0]['value'];
        var lastName = allMemberData[i].properties['last_name'][0]['value'];
        console.dir(allMemberData[i], {depth: 5});

//     first_name: [ { id: 'xzq-cs0-35x', value: 'Bill' } ],
        console.log(firstName + ' ' + lastName);

        // var clientQueryStr = 'g.V().has(\'first_name\',' + '\'' + firstName + '\'' + ',\'last_name\',' + '\'' +lastName + '\'' +');';
        var clientQueryStr = 'g.V().has(\'first_name\',' + '\'' + firstName + '\'' +');';

        console.log(clientQueryStr);
        queries.push(clientQueryStr);
    }

    Promise.map(queries, GremlinQuery);
}

// Execute gremlin query
const GremlinQuery = function(query)
{
    client.execute(query, function(err, results) {
        if (!err) {
            console.dir(results, {depth: 5});
        }
        else{
            console.log("Error executing " + query);
        }
    });
}

// Command line parsing
// EX: node app.js populate senate propublicaapifile.json
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

// EX: node app.js committees senate dir
// The directory argument should contain all the files returned from 
// https://github.com/hareeshnagaraj/propublica-api-population

if(args[0] == committees)
{
    if(args.length < 3)
    {   
        throw new Error('Incorrect usage. Ex: node app.js committees [house/senate] [path to dir]');
    }
    else if (args[1] != house && args[1] != senate)
    {
        throw new Error('Incorrect usage. Ex: node app.js committees [house/senate] [path to dir]');        
    }

    var chamber = args[1];
    var dir = args[2];

    console.log('Populating ' + chamber + ' Committees from : ' + dir);

    client.execute('g.V()', function(err, results) {
        if (!err) {
            FindCorrespondingMemberJsonFiles(results, dir);
        }
        else{
            throw new Error("Error executing " + query);
        }
    });
}