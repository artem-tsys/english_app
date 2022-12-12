import { render, screen } from '@testing-library/react'
import React from 'react'
import { Home } from 'src/components/pages/home/Home.page'

test('home page', () => {
  render(<Home />)
  const btnCreate = screen.getByTestId(/btn-create/i)
  expect(btnCreate).toBeInTheDocument()
})
