import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import nock from 'nock'
import { apiUrl } from 'src/config'
import { MemoryRouterPages } from 'src/helpers/MemoryRouterPages'
import modules from './fixtures/modules.json'

beforeEach(() => {
  nock(apiUrl).get('/modules').reply(200, modules, { 'Access-Control-Allow-Origin': '*' })
})

const moduleId = modules[0].id

describe('test routes', () => {
  test('redirect to home page', async () => {
    render(<MemoryRouterPages />)
    const title = await screen.findByTestId('slider-title-modules')
    expect(title).toBeInTheDocument()
  })
  test('redirect to modules page', async () => {
    render(<MemoryRouterPages path={`/module/${moduleId}`} />)
    const buttons = await screen.findAllByTestId('button-card')
    const btnModule = screen.getByText(/карточки/i)
    expect(buttons).toHaveLength(3)
    expect(btnModule).toBeInTheDocument()
  })
  test('redirect to exercise memorization page', async () => {
    render(<MemoryRouterPages path={`/module/${moduleId}/memorization`} />)
    const title = await screen.findByText(/round/i)
    expect(title).toBeInTheDocument()
  })
  test('redirect to not created page', async () => {
    render(<MemoryRouterPages path="/notCreated" />)
    const title = await screen.findByText(/страница не создана/i)
    expect(title).toBeInTheDocument()
  })
  test('redirect to notFound page', async () => {
    render(<MemoryRouterPages path="/wrongUrl" />)
    const title = await screen.findByText(/страница не найдена/i)
    expect(title).toBeInTheDocument()
  })
})
