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

//arg1=cycle
const independentContributersApiAddress = 'https://api.propublica.org/campaign-finance/v1/%s/independent_expenditures.json';

//arg1=cycle arg2=commiteeId
const candidateCommitteeFilingsApiAddress = 'https://api.propublica.org/campaign-finance/v1/%s/committees/%s/filings.json';

//arg1=cycle arg2=commiteeId
const lobbyBundlersApiAddress = 'https://api.propublica.org/campaign-finance/v1/%s/committees/%s/lobbyist_bundlers.json';

// Return promise-request options
const RequestOptions = (uri) => {
    return {
        uri : uri,
        headers: {
            'User-Agent': 'Request-Promise',
            'x-api-key' : apiKey
        },
        json: true // Automatically parses the JSON string in the response
    };
}

const getProPublicaRequestResults = (resp) =>{
    if(resp['results'] == null ||
        resp['results'] == undefined){
            throw new Error('undefined res');
        }

    return resp['results'];
}

 const proPublicaRequest = (uri, throwOnErr = true) =>{
    return rp(RequestOptions(uri))
            .then((resp) => {
                return getProPublicaRequestResults(resp);
            })
            .catch((err) =>{
                if(throwOnErr){
                    console.log(`proPublicaRequest Error : ${err}, ${uri}`);
                    throw new Error(err);
                }
            });
 }

// Return a request promise to the json of total contributions to all candidates
// https://propublica.github.io/campaign-finance-api-docs/#presidential-candidate-totals
const getCandidateTotals = (year) => {

    return proPublicaRequest(
        util.format(
            candidateTotalApiAddress,
            year));
}

const getCandidateCommitteeInfo = (commiteeId, year) => {

    return proPublicaRequest(
        util.format(
            candidateCommitteeInfoApiAddress,
            year,
            commiteeId));
}

const getCandidateCommitteeFilings = (committeeId, year) => {

    return proPublicaRequest(
            util.format(
                candidateCommitteeFilingsApiAddress,
                year,
                committeeId));
}

const getLobbyBundlers = (committeeId, year) => {
    return proPublicaRequest(
            util.format(
                lobbyBundlersApiAddress,
                year,
                committeeId));
}

const getIndependentCandidateContributions = (year) => {

    return proPublicaRequest(
        util.format(
            independentContributersApiAddress,
            year));
}


// Command line actions
if(args[0] == 'pres-candidate-totals' && args[1] != null){
    var year = args[1];
    console.log("Retrieves totals (receipts and disbursements, plus several calculated values) for all presidential candidates for a particular campaign cycle (2008, 2012, 2016).")
    console.log(`Candidate Cycle : ${year}`);

    getIndependentCandidateContributions(year)
        .then((candidateContributions)=>{
            console.log(candidateContributions);
            getCandidateTotals(year)
                .then((candidateTotals)=>{
                    most.from(candidateTotals)
                        .map((candidateInfo)=>{
                                getCandidateCommitteeInfo(candidateInfo.committee_id, year)
                                    .then((x)=>{
                                        
                                        var candidateCommitteeInfo = x[0];
                                        
                                        console.log(`${candidateInfo.name} ${candidateInfo.committee_id} : 
                                        \n\tReceipts ${candidateInfo.total_receipts}, Cash ${candidateInfo.cash_on_hand} | 
                                        \n\tCommittee : ${candidateCommitteeInfo.name}, Total Receipts : ${candidateCommitteeInfo.total_receipts}\n`);

                                        getCandidateCommitteeFilings(candidateInfo.committee_id, year)
                                            .then((x)=>{
                                                var filings = x[0];
                                                most.from(x)
                                                    .filter((f)=>{
                                                        return f.contributions_total != null;
                                                    })
                                                    .observe((f)=>{
                                                        console.log(`\n\t\t\t${f.date_filed} ${f.contributions_total} ${f.disbursements_total}`);
                                                    });
                                            });
                                    });
                                
                                getLobbyBundlers(candidateInfo.committee_id, year)
                                    .filter((x)=>{
                                        //console.log(Object.prototype.toString.call(x));
                                        return typeof(x) == 'object' &&
                                                x.bundler_employer != null;
                                    })
                                    .then((x)=>{
                                        //console.log(x);
                                            most.from(x)
                                                .observe((bundler)=>{
                                                    console.log(`\n\t\t${bundler.bundler_employer} ${bundler.bundled_amount}`);
                                                });
                                    })
                                    .catch((x)=>{
                                    })

                                
                        })
                        .observe((x)=>{
                        })
                        .catch((e)=>{
                            console.log(e);
                        })
                });
            });
}
