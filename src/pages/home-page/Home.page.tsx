import cn from 'classnames'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnCreate } from 'src/components/shared/buttons/Create.button'
import { actionSetModuleId } from 'src/redux/general/common'
import { modulesSelectors } from 'src/redux/modules/modules.selectors'
import { HeaderWithLogo } from '../../components/headers/Header-with-logo'
import { ModulesSlider } from '../../components/slider/Modules-slider'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import style from './home.module.scss'

type Handle = (id: string) => () => void

export function HomePage(): JSX.Element {
  const modules = useAppSelector(modulesSelectors.selectAll)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handlerCreate = useCallback((): void => {
    navigate('createModule')
  }, [navigate])

  const handleClick = useCallback<Handle>(
    (id) => () => {
      dispatch(actionSetModuleId(id))
      navigate(`/module/${id}`)
    },
    [navigate],
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
