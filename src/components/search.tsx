import * as React from 'react'


//https://github.com/searchkit/searchkit
//https://github.com/bvaughn/redux-search

export interface SearchProps { input: string; }

export function Search(props: SearchProps){
  return (
    <div>
      <h1> {props.input} </h1>
      <input/> <input/>
      <p> What do you want to search for today?</p>
    </div>
  )
}

// type="search">Search Graph</input>
