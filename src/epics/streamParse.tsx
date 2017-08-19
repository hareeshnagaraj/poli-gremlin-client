import * as Rx from 'rxjs';

/* Congress Critter JSON Observable */
export const graphData = Rx.Observable.ajax.getJSON('/test')

export const graphDataObservable = graphData.subscribe(handleGraphData(visualizer), handleObsErr)

// export const graphDataObservable = graphData.subscribe(handleGraphData(visualizer), handleObsErr)

//main stream control flow function
  //can be passed logger or visualizer
function handleGraphData(streamHander) {
  return (data) => {
    return streamHander(data)
  }
}

function visualizer(data){
  return data.filter(filterCongressCritters('R')) // {D: Democrats, R: Republicans}
}


function logger(data){
  return data.filter(filterCongressCritters('D')) // {D: Democrats, R: Republicans}
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
