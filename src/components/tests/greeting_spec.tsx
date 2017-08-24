import * as React from 'react'
import * as TestUtils from 'react-addons-test-utils'

import { createStore } from 'redux'

import { Greeting } from '../dashboard'
import { graphReducer } from '../../state/reducers/graphState'

import { Graph,graph,options,events } from '../containers/visualizer'

/* Inspired by: https://rjzaworski.com/2016/12/testing-typescript-with-jest */

describe('<Greeting />', () => {
  it('renders', () => {
    expect(TestUtils.createRenderer().render(
      <Greeting name='Bill!'/>
    )).toMatchSnapshot()
  })
});

describe('<Graph />', () => {
  it('renders', () => {
    const store = createStore(graphReducer)
    expect(TestUtils.createRenderer().render(
      <Graph.default graph={graph} options={options} events={events} />
      // <Graph label='a counter!' store={store} />
    )).toMatchSnapshot()
  })
});

/*

describe('<Rating />', () => {
  it('renders', () => {
    expect(TestUtils.createRenderer().render(
      <Greeting name='Bill!'/>
    )).toMatchSnapshot()
  })
});

*/
