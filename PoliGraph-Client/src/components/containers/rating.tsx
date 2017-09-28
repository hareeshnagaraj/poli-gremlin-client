/*

  Allow user to vote up or down the weight of an edge
    -Crowdsource relationships between nodes (congressmen, news events, etc...)!!

*/

import * as React from 'react'
import {connect} from 'react-redux'

import {Store} from '../../state/store'

const RateItem = ({rating, incrementRating, decrementRating}) => {
  return (
    <div>
      <p> Current Rating: {rating.rating ? rating.rating : 0} </p>
      <span onClick={incrementRating}><button> + </button></span>
      <span onClick={decrementRating}><button> - </button></span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    rating : state.ratingReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementRating : () => dispatch({
        type : 'RATE_ITEM_UP'
      })
    ,
    decrementRating : () => dispatch({
      type : 'RATE_ITEM_DOWN'
    })
  }
}

export const Rating = connect(
  mapStateToProps,
  mapDispatchToProps
)(RateItem)
