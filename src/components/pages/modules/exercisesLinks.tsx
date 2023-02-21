import { ExerciseLink } from 'src/components/pages/modules/exercisesLink'
import style from 'src/components/pages/modules/modules.module.scss'

const generatePathExercises = (type: string) => (id: string | number) => `/module/${id}/${type}`

const RoutesButtons = [
  {
    createPath: generatePathExercises('cards'),
    title: 'Карточки',
    description: 'Повторите термины и определения',
    image: `${process.env.PUBLIC_URL}/cards.png`,
    disable: false,
  },
  {
    createPath: generatePathExercises('memorization'),
    title: 'Заучивание',
    description: 'Не повторяйте мои ошибки',
    image: `${process.env.PUBLIC_URL}/repeat.png`,
    disable: false,
  },
  {
    createPath: generatePathExercises(''),
    title: 'Правописание',
    description: 'Учитесь писать правильно',
    image: `${process.env.PUBLIC_URL}/hand-with-pen.png`,
    disable: true,
  },
]

export const LinksExercises = ({ moduleId }: { moduleId: string }) => (
  <div className={style.buttonsGroup}>
    {RoutesButtons.map(({ createPath, ...card }, index) => (
      <ExerciseLink card={card} createPath={createPath} moduleId={moduleId} key={index} />
    ))}
  </div>
)
