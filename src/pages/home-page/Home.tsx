import cn from 'classnames'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { modulesSelectors } from 'src/redux/modules/modules.selectors'
import { BtnCreate } from '../../components/buttons/create/create'
import { HeaderWithLogo } from '../../components/headers/Header-with-logo'
import { ModulesSlider } from '../../components/slider/Modules-slider'
import { useAppSelector } from '../../hooks/redux'
import style from './home.module.scss'

type Handle = (id: string) => () => void

export function Home(): JSX.Element {
  const modules = useAppSelector(modulesSelectors.selectAll)
  const navigate = useNavigate()

  const handlerCreate = useCallback((): void => {
    navigate('createModule')
  }, [navigate])

  const handleClick = useCallback<Handle>(
    (id) => () => {
      navigate(`/module/${id}`)
    },
    [navigate]
  )

  return (
    <>
      <HeaderWithLogo />
      <div className="wrapper">
        <ModulesSlider data={modules} handleClick={handleClick} />
        <div className={cn(style.buttonCreate)}>
          <BtnCreate handler={handlerCreate} text="Create Module" />
        </div>
      </div>
    </>
  )
}
