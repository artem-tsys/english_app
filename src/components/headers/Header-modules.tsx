import { ComebackButton } from 'src/components/buttons/comeback/Comeback-button'
import { MoreButton } from 'src/components/buttons/more/MoreButton'
import { ShareButton } from 'src/components/buttons/share/Share-button'
import style from 'src/styles/main.module.scss'

export const HeaderModules = () => (
  <div className={style.header}>
    <ComebackButton />
    <div className={style.ms_auto}>
      <ShareButton styleName={style.me_sm} />
      <MoreButton />
    </div>
  </div>
)
