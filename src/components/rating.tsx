/*

  Allow user to vote up or down the weight of an edge
    -Crowdsource relationships between nodes (congressmen, news events, etc...)!!

  Good way to text redux state store connection -> increment,decrement examples

  https://github.com/reactjs/redux/blob/master/docs/basics/UsageWithReact.md

  http://blog.tylerbuchea.com/super-simple-react-redux-application-example/

*/

import * as React from 'react'
import {connect} from 'react-redux'

import {Store} from '../state/store'

const RateItem = (props = {rating, incrementRating, decrementRating}) => {
  console.log(this,{rating, incrementRating, decrementRating},this.props)
  // item currently undefined       <p>{item.rating || 0}</p>
  return (
    <div>
      {this.props.rating ? this.props.rating : 0}
      <span onClick={props.incrementRating}><button> + </button></span>
      <span onClick={props.decrementRating}><button> - </button></span>
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
    incrementRating : () => {
      console.log('increased rating')
      return dispatch({
        type : 'RATE_ITEM_UP'
      })
    },
    decrementRating : () => dispatch({
      type : 'RATE_ITEM_DOWN'
    })
  }
}

export const Rating = connect(
  mapStateToProps,
  mapDispatchToProps
)(RateItem)
