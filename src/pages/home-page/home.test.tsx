import { render, screen } from '@testing-library/react'
import React from 'react'
import { HomePage } from 'src/pages/home-page/Home.page'

test('home page', () => {
  render(<HomePage />)
  const btnCreate = screen.getByTestId(/btn-create/i)
  expect(btnCreate).toBeInTheDocument()
})
