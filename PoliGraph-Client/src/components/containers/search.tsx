import * as React from 'react'
import {connect} from 'react-redux'

function submitQuery(){
  //dispatch()
}

//https://github.com/searchkit/searchkit
//https://github.com/bvaughn/redux-search

export interface SearchProps { input: string; }

export function SearchComponent(props: SearchProps){
  return (
    <div>
      <h1> {props.input} </h1>
      <p> What do you want to search for today?</p>
      <input/><button onSubmit={submitQuery}>Search</button>
    </div>
  )
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => {

}

export const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)
