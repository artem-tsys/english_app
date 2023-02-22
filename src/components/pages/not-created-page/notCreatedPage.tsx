import { HeaderWithBack } from 'src/components/shared/headers/Header-with-back'
import style from 'src/styles/main.module.scss'

export const NotCreated = (): JSX.Element => (
  <div>
    <HeaderWithBack className={style.headerBackground} />
    <p>страница не создана</p>
  </div>
)
