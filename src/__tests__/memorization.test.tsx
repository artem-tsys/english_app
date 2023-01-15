import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import nock from 'nock'
import { apiUrl } from 'src/config'
import { MEMORIZATION_NUMBER_ANSWERS } from 'src/constants/exercises.constants'
import { getAnswer } from 'src/helpers/GetAnswer'
import { RenderTestApp } from 'src/helpers/RenderTestApp'
import { ITerm } from 'src/types/terms'

function nockModules(data, code = 200) {
  nock(apiUrl).get('/modules').delay(500).reply(code, data, { 'Access-Control-Allow-Origin': '*' })
}

describe('test view', () => {
  const modules = [
    {
      id: '1',
      title: 'Прилагательные',
      languages: ['ua', 'en'],
      terms: [
        {
          id: '1',
          ua: 'эффективный',
          en: 'efficient',
        },
        {
          id: '2',
          ua: 'дорогой',
          en: 'expensive',
        },
        {
          id: '3',
          ua: 'яблоко',
          en: 'apple',
        },
        {
          id: '4',
          ua: 'банан',
          en: 'banana',
        },
        {
          id: '5',
          ua: 'что?',
          en: 'what?',
        },
      ],
      exercises: {
        memorization: {
          round: 0,
          learnedIds: [],
        },
        cards: {
          learned: [],
          unlearned: [],
        },
      },
    },
  ]
  const moduleId = modules[0].id

  test('title round 1', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const title = await screen.findByTestId('titleRound')
    const titleText = title.textContent

    expect(title).toBeInTheDocument()
    expect(titleText).toBe('round 1')
  })

  test('question display test', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const question = await screen.findByTestId('question')
    expect(question).toBeInTheDocument()
  })

  test('correct answer', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const question = await screen.findByTestId('question')
    const questionText = question.textContent
    const answerText = getAnswer(modules[0].terms as ITerm[], questionText)
    const answer = screen.getByText(answerText)

    expect(answer).toBeInTheDocument()
  })

  test('error fetch modules', async () => {
    const errorMessage = 'no access to data'
    nockModules(
      {
        message: errorMessage,
      },
      403,
    )

    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const question = screen.queryByTestId('question')
    const loading = screen.queryByText('Loading')

    expect(question).not.toBeInTheDocument()
    expect(loading).toBeNull()

    const error = await screen.findByText(errorMessage)
    expect(error).toBeInTheDocument()
  })
})

describe('select answers', () => {
  const modules = [
    {
      id: '1',
      title: 'Прилагательные',
      languages: ['ua', 'en'],
      terms: [
        {
          id: '1',
          ua: 'эффективный',
          en: 'efficient',
        },
        {
          id: '2',
          ua: 'дорогой',
          en: 'expensive',
        },
        {
          id: '3',
          ua: 'яблоко',
          en: 'apple',
        },
        {
          id: '4',
          ua: 'банан',
          en: 'banana',
        },
        {
          id: '5',
          ua: 'что?',
          en: 'what?',
        },
      ],
      exercises: {
        memorization: {
          round: 3,
          learnedIds: [1, 2, 4, 5],
        },
        cards: {
          learned: [],
          unlearned: [],
        },
      },
    },
  ]
  const moduleId = modules[0].id

  test('round three', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)
    const title = await screen.findByTestId('titleRound')
    const titleText = title.textContent

    expect(title).toBeInTheDocument()
    expect(titleText).toBe('round 3')
  })

  test('last term success answer', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const answers = await screen.findAllByTestId('answer')
    expect(answers).toHaveLength(MEMORIZATION_NUMBER_ANSWERS)

    const question = await screen.findByTestId('question')
    const questionText = question.textContent
    const answerText = getAnswer(modules[0].terms as ITerm[], questionText)
    const questionNode = screen.getByText(answerText)

    const beforeClickPopup = screen.queryByText('вы ответили правильно!')
    expect(beforeClickPopup).not.toBeInTheDocument()
    fireEvent.click(questionNode)

    const successPopup = await screen.findByText('вы ответили правильно!')
    expect(successPopup).toBeInTheDocument()
  })

  test('last term wrong answer', async () => {
    nockModules(modules)
    render(<RenderTestApp path={`/module/${moduleId}/memorization`} />)

    const question = await screen.findByTestId('question')
    const questionText = question.textContent
    const answerText = getAnswer(modules[0].terms as ITerm[], questionText)
    const answers = screen.getAllByTestId('answer')
    const wrongAnswer = answers.find((answer) => answer.textContent !== answerText).textContent

    const beforeClickPopup = screen.queryByText('выучите этот термин!')
    expect(beforeClickPopup).toBeNull()

    fireEvent.click(screen.getByText(wrongAnswer))

    const successPopup = await screen.findByText('выучите этот термин!')
    expect(successPopup).toBeInTheDocument()
  })
})
