# ProPublica API Data Population

Populating JanusGraph + Cassandra/ES Instance with data from ProPublica

Example Usage:

    node app.js populate senate congress #

Most recent congress session (2017)

    node app.js populate senate 115

    node app.js populate house 115

## Additional Flags:

-l : list mode - lists response from API and does not populate graph

        node app.js populate house 115 list
