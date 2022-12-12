import cn from 'classnames'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import style from 'src/components/pages/home/home.module.scss'
import { BtnCreate } from 'src/components/shared/buttons/Create.button'
import { HeaderWithLogo } from 'src/components/shared/headers/Header-with-logo'
import { ModulesSlider } from 'src/components/shared/slider/Modules-slider'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { UPDATE_MODULE_ID } from 'src/redux/general/common'
import { modulesSelectors } from 'src/redux/modules/modules.selectors'

type Handle = (id: string) => () => void

export function Home(): JSX.Element {
  const modules = useAppSelector(modulesSelectors.selectAll)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handlerCreate = useCallback((): void => {
    navigate('createModule')
  }, [navigate])

  const handleClick = useCallback<Handle>(
    (id) => () => {
      dispatch(UPDATE_MODULE_ID(id))
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
