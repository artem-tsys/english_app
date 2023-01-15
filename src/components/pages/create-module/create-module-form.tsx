import { Formik } from 'formik'

export const CreateModulesForm = ({ initialState, handleSubmit, children }): JSX.Element => (
  <Formik initialValues={initialState} enableReinitialize onSubmit={handleSubmit}>
    {children}
  </Formik>
)
