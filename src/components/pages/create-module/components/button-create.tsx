import { useFormikContext } from 'formik'
import { FC } from 'react'
import style from 'src/components/pages/create-module/create-module.module.scss'

type ButtonCreateProps = {
  handleAddTerm: <T>(values: T) => void
}

export const ButtonCreate: FC<ButtonCreateProps> = ({ handleAddTerm }) => {
  const formik = useFormikContext()

  return (
    <button
      className={style.buttonAdd}
      onClick={() => handleAddTerm<typeof formik.values>(formik.values)}
      data-testid="btn-add"
      aria-label="button add"
    />
  )
}
