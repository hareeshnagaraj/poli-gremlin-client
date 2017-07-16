// Populate a JanusGraph server with data pulled from ProPublica API
// Repo: https://github.com/hareeshnagaraj/propublica-api-population

// Assuming Node.js or Browser environment with browserify: 
var gremlin = require('gremlin-client');
 
// Will open a WebSocket to ws://localhost:8182 by default 
var client = gremlin.createClient();

var query = client.stream('g.V()');
 
// If playing with classic TinkerPop graph, will emit 6 data events 
query.on('data', function(result) {
  // Handle first vertex 
  console.log(result);
  console.log(result['properties']);
});
 
query.on('end', function() {
  console.log("All results fetched");
});
