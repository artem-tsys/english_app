import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from './Home'

test('home page', () => {
  render(<Home />)
  const btnCreate = screen.getByTestId(/btn-create/i)
  expect(btnCreate).toBeInTheDocument()
})
