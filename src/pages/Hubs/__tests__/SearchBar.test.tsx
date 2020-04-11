/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchBar from '../SearchBar'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'src/store'

it('renders without crashing', () => {
  expect(
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    ).baseElement
  ).toBeInTheDocument()
})

it('does nothing on submit', () => {
  const form = render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  ).baseElement.firstElementChild.firstChild

  

  expect(form.submit()).toReturn()
})