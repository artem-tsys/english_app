import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { IModule } from '../../../types/modules'
import style from './modules.module.scss'

type IModulesCard = (props: {
  data: IModule
  handleClick?: (id: string) => () => void
}) => JSX.Element

const handleClickDefault = () => () => {}

export const Modules: IModulesCard = ({
  data,
  handleClick = handleClickDefault,
}) => (
  <button className={style.module} onClick={handleClick(data.id)}>
    <h4 className={style.title}>{data.title}</h4>
    <span className={style.count}>{data.phrases.length} терминов</span>
  </button>
)
