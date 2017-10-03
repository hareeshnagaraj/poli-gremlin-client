// Set your API key to an environment variable
// Below script assumes propublicakey=yourkey and is accessed through process.env
// You can set the env var with the following command: export propublicacampaignfinancekey={your key}
// Update ~/.bash_profile with : export propublicacampaignfinancekey=<yourkey>
const fs = require('fs');
const gremlin = require('gremlin-client');
const Congress = require('propublica-congress-node');
const uuid = require('uuid');
const argv = require('minimist')(process.argv.slice(2));
const util = require('util');
const most = require('most');
const rp = require('request-promise');


// Command line related constants
const args = argv['_'];
const apiKey = process.env.propublicacampaignfinancekey;
console.log(apiKey);

// Api Addresses
// arg1=cycle
const candidateTotalApiAddress = 'https://api.propublica.org/campaign-finance/v1/%s/president/totals.json';

// arg1=cycle, arg2=commitee id
const candidateCommitteeInfoApiAddress = 'https://api.propublica.org/campaign-finance/v1/%s/committees/%s.json';

const options = {
    headers: {
        'User-Agent': 'Request-Promise',
        'x-api-key' : apiKey
    },
    json: true // Automatically parses the JSON string in the response
};

// Return promise-request options
const getRequestOptions = (uri) => {
    options.uri = uri;
    return options;
}

const getProPublicaRequestResults = (resp) =>{
    if(resp['results'] == null ||
        resp['results'] == undefined ||
        resp['results'][0] == null || 
        resp['results'] == undefined){
            throw new Error('undefined res');
        }

    return resp['results'];
}

// Return a request promise to the json of total contributions to all candidates
// https://propublica.github.io/campaign-finance-api-docs/#presidential-candidate-totals
const getCandidateTotals = (year) => {

    var options = getRequestOptions(util.format(candidateTotalApiAddress, year));

    return rp(options)
            .then((resp) => {
                return getProPublicaRequestResults(resp);
            })
            .catch((err) =>{
                console.log(`getCandidateTotals Error : ${err}`);
            });
}

const getCandidateCommitteeInfo = (candidateInfo, year) => {

    var options = getRequestOptions(
                    util.format(
                        candidateCommitteeInfoApiAddress,
                        year,
                        candidateInfo.committee_id));

    return rp(options)
            .then((resp) => {
                return getProPublicaRequestResults(resp);
            })
            .catch((err) =>{
                console.log(`getCandidateCommitteeInfo Error : ${err}`);
            });
}

// Command line actions
if(args[0] == 'pres-candidate-totals' && args[1] != null){
    var year = args[1];
    console.log("Retrieves totals (receipts and disbursements, plus several calculated values) for all presidential candidates for a particular campaign cycle (2008, 2012, 2016).")
    console.log(`Candidate Cycle : ${year}`);

     getCandidateTotals(year)
        .then((r)=>{
            most.from(r)
                .map((candidateInfo)=>{
                    getCandidateCommitteeInfo(candidateInfo, year)
                        .then((x)=>{
                            var candidateCommitteeInfo = x[0];
                            console.log("-----------------------------");
                            console.log(candidateCommitteeInfo);
                            console.log("-----------------------------");
                        })
                })
                .observe((x)=>{
                })
                .catch((e)=>{
                    console.log(e);
                })
        });
}

console.log(options.uri);

/*
var options = {
    headers: {
        'User-Agent': 'Request-Promise',
        'x-api-key' : apiKey
    },
    json: true // Automatically parses the JSON string in the response
};

console.log(options.uri);
var x = rp(options)
            .then((resp) => {
                return resp;
            })
            .catch((err) =>{
                // API call failed...
            });

x.then((y)=>{console.log(y)});

*/