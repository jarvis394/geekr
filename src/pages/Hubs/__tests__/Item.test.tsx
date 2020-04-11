/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import React from 'react'
import { render } from '@testing-library/react'
import Item from '../Item'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'src/store'
import { HubObject } from 'src/interfaces'
import { BrowserRouter as Router } from 'react-router-dom'

const testData: HubObject = {
  id: 1,
  rating: '0',
  is_profiled: false,
  title: 'Title string',
  alias: 'Alias string',
  about_small: 'About small string',
  about: 'About string',
  count_subscribers: '123',
  count_posts: '456',
  tags_string: 'Tags string',
  is_membership: false,
  is_company: false,
  flow: [],
  icon: 'Icon string',
  path: 'Path string',
}

it('renders without crashing', () => {
  expect(
    render(
      <Provider store={store}>
        <Router>
          <Item data={testData} />
        </Router>
      </Provider>
    ).baseElement
  ).toBeInTheDocument()
})

it('has a right title text', () => {
  const { getByText } = render(
    <Router>
      <Item data={testData} />
    </Router>
  )
  expect(getByText('Title string')).toBeInTheDocument()
})

it('has a right about text', () => {
  const { getByText } = render(
    <Router>
      <Item data={testData} />
    </Router>
  )
  expect(getByText('About small string')).toBeInTheDocument()
})
