import { useFormikContext } from 'formik'
import style from 'src/components/pages/create-module/create-module.module.scss'

export const ButtonCreate = ({ handleAddTerm }) => {
  const formik = useFormikContext()

  return (
    <button
      className={style.buttonAdd}
      onClick={() => handleAddTerm(formik.values)}
      data-testid="btn-add"
      aria-label="button add"
    />
  )
}
