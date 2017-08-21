/*

  Allow user to vote up or down the weight of an edge
    -Crowdsource relationships between nodes (congressmen, news events, etc...)!!

  Good way to text redux state store connection -> increment,decrement examples

  https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md
  
*/

import * as React from 'react'
import {connect} from 'react-redux'

import {Store} from '../state/store'

const RateItem = ({item, incrementRating, decrementRating}) => {
  return (
    <div>
      {item.rating || 0}
      <span onClick={incrementRating}> + </span>
      <span onClick={decrementRating}> - </span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    rating : state.rating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementRating : () => dispatch({
      type : 'RATE_ITEM_UP'
    }),
    decrementRating : () => dispatch({
      type : 'RATE_ITEM_DOWN'
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateItem)
