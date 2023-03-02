import { useFormikContext } from 'formik'
import { FC } from 'react'
import style from './button-create.module.scss'

type ButtonCreateProps = {
  handleAddTerm: <T>(values: T) => void
}

export const ButtonCreate: FC<ButtonCreateProps> = ({ handleAddTerm }) => {
  const formik = useFormikContext()

  return (
    <button
      className={style.button}
      onClick={() => handleAddTerm<typeof formik.values>(formik.values)}
      data-testid="btn-add"
      aria-label="button add"
    />
  )
}
