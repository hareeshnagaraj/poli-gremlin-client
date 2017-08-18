# poli-gremlin-client

Real-time visualization of Congressional graph data


## Architecture

* Front End: Typescript, React, RxJS, Webpack, Docker, propublica-congress-node, gremlin-client

----

* Back End: JanusGraph, Cassandra, Azure, Java


## Test

HTTP/2 : https://webapplog.com/http2-server-push-node-express/
         test -> curl -I --verbose --capath ./config https://127.0.0.1:3000
