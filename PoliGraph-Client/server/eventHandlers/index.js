const express = require('express')
const path = require('path')
const router = express.Router()
const gremlin = require('gremlin-client');
const GremlinClient = gremlin.createClient(8182, '40.112.250.222');

router.get('/', (req, res) => {
    // res.send('Hello, World!')
    console.log("/Test Data Return : ");
    GremlinClient.execute(
      'g.V()',
      function(err, results) {
            if (!err) {
                console.dir(results, {depth: 5});
                res.send(results);
            }
            else{
                res.send("Error executing " + err);
            }
        });
})

router.get('/:name', (req, res) => {
    const { name } = req.params

    res.send(`Hello, ${name}!`)
})

module.exports = router
