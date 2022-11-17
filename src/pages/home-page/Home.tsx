import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { BtnCreate } from '../../components/buttons/create/create'
import { ModulesSlider } from '../../components/slider/Modules-slider'
import { useAppSelector } from '../../hooks/redux'
import { modulesSelectors } from '../../store/app.selectors'

type Handle = (id: string) => () => void

export function Home(): JSX.Element {
  const modules = useAppSelector(modulesSelectors.selectAll)
  const navigate = useNavigate()

  const handlerCreate = useCallback((): void => {
    navigate('createModule')
  }, [navigate])

  const handleClick = useCallback<Handle>(
    (id) => () => {
      navigate('module', { state: { id } })
    },
    [navigate]
  )

  return (
    <>
      <ModulesSlider data={modules} handleClick={handleClick} />
      <BtnCreate handler={handlerCreate} text="Create Module" />
    </>
  )
}
