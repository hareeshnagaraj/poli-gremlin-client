# Server Setup

	1) Navigate to - /home/politigraphadmin/janusgraph-0.1.1-hadoop2 (replace politigraph with user on VM)

	2) Modify /home/politigraphadmin/janusgraph-0.1.1-hadoop2/conf/gremlin-server/gremlin-server.yaml with following:

	3) host: 0.0.0.0
	port: 8182
	scriptEvaluationTimeout: 30000
	channelizer: org.apache.tinkerpop.gremlin.server.channel.WebSocketChannelizer
	graphs: {
	  graph: conf/gremlin-server/janusgraph-cassandra-es-server.properties}
	4) bin/janusgraph.sh start

	Killing Cassandra (pid 7496)...
	politigraphadmin@politigraph3:~/janusgraph-0.1.1-hadoop2$ bin/janusgraph.sh start
	Forking Cassandra...
	Running `nodetool statusthrift`.... OK (returned exit status 0 and printed string "running").
	Forking Elasticsearch...
	Connecting to Elasticsearch (127.0.0.1:9300)... OK (connected to 127.0.0.1:9300).
	Forking Gremlin-Server...
	Connecting to Gremlin-Server (127.0.0.1:8182)......... OK (connected to 127.0.0.1:8182).
	Run gremlin.sh to connect.
	politigraphadmin@politigraph3:~/janusgraph-0.1.1-hadoop2$ bin/janusgraph.sh status
	

## Additional config:
	For this dev environment w/cassandrathrift running locally, ensure storage.hostname=127.0.0.1
	File - sftp://politigraphadmin@40.112.250.222/home/politigraphadmin/janusgraph-0.1.1-hadoop2/conf/gremlin-server/janusgraph-cassandra-es-server.properties

## Test Locally
	1) Update a remote.yaml with following:
		hosts: [40.112.250.222]
		port: 8182
		username: politigraphadmin
		password: 
		serializer: { className: org.apache.tinkerpop.gremlin.driver.ser.GryoMessageSerializerV1d0, config: { serializeResultToString: true }}
	2) Start gremlin shell with bin/gremlin.sh
	3) Connect to remote
		plugin activated: tinkerpop.tinkergraph
		gremlin> :remote connect tinkerpop.server conf/remote.yaml
    ==>Configured 40.112.250.222/40.112.250.222:8182