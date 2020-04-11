/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import Post from '..'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'src/store'
import { BrowserRouter as Router } from 'react-router-dom'

it('renders without crashing', () => {
  expect(
    render(
      <Provider store={store}>
        <Router>
          <Post />
        </Router>
      </Provider>
    ).baseElement
  ).toBeInTheDocument()
})