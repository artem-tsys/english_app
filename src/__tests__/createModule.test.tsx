import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { CreateModule } from 'src/components/pages/create-module/create-module'
import { RenderTestApp } from 'src/helpers/render-test-app'

describe('create module integration tests', () => {
  test('add new fields', async () => {
    render(<RenderTestApp path="/createModule" component={<CreateModule />} />)

    expect(await screen.findByTestId('page-title')).toBeInTheDocument()

    expect(screen.queryAllByTestId('term-group')).toHaveLength(2)
    fireEvent.click(screen.getByTestId('btn-add'))
    expect(screen.queryAllByTestId('term-group')).toHaveLength(3)
  })

  test('add new fields', async () => {
    render(<RenderTestApp path="/createModule" component={<CreateModule />} />)

    fireEvent.click(screen.getByTestId('btn-add'))
    expect(screen.queryAllByTestId('term-group')).toHaveLength(3)
  })

  test('set values with add new group', async () => {
    const values = [
      ['term-1 field-1', 'term-1 field-2'],
      ['term-2 field-1', 'term-2 field-2'],
    ]
    render(<RenderTestApp path="/createModule" component={<CreateModule />} />)
    const groups = screen.getAllByTestId('term-group')

    groups.forEach((group, indexGroup) => {
      const fields = within(group).getAllByTestId('term-name-field')
      fields.forEach((field, indexField) => {
        fireEvent.paste(field, { target: { value: values[indexGroup][indexField] } })
      })
    })

    fireEvent.click(screen.getByTestId('btn-add'))

    const fields = within(screen.getByTestId('form-group-terms')).getAllByTestId('term-name-field')
    expect(fields).toHaveLength(6)
    expect(fields[0]).not.toHaveValue('')
    expect(fields[2]).toHaveValue('term-2 field-1')
    expect(fields[4]).toHaveValue('')
  })
})
