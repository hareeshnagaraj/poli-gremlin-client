import * as React from 'react'
import * as TestUtils from 'react-addons-test-utils'

import { createStore } from 'redux'

import { Greeting } from '../dashboard'
import { graphReducer } from '../../state/reducers/graphState'

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
      <Greeting name='Bill!'/>
      // <Greeting label='a counter!' store={store} />
    )).toMatchSnapshot()
  })
});
