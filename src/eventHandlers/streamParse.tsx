import {graphData} from './index'

/* Congress Critter JSON Observable */
export const graphDataObservable = graphData.subscribe(handleGraphData, handleObsErr)

//main stream control flow function
function handleGraphData(data) {
  return data.filter(filterCongressCritters('D')) // {D: Democrats, R: Republicans}
             .map(s => s)
             .forEach(s => console.log(s,s.length))
}

function filterCongressCritters(party: string): any {
  return (critter) => {
    return critter.properties.party[0].value === party
  }
}

function handleObsErr(err){
  console.error(`Stream Error: ${err}`)
}
