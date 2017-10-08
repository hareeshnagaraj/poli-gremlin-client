const most = require('most')

const testData = [1,2,3,4,5]

most.from(testData)
  // .forEach(console.log.bind(console));
  // .map(dataObs => console.log(dataObs))


const Contract = {}

Contract.prototype = function(terms) {
  const terms = {
    properties: 'heyo',
    nodes: {},
    links: []
  }

  return terms
}

const testContract = new Contract({})

console.log(testContract)
