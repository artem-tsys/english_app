import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const handleToHome = () => {
    navigate('/')
  }

  return (
    <div>
      <h2>страница не найдена</h2>
      <div>
        <button onClick={handleBack}>назад</button>
        <button onClick={handleToHome}>на главную</button>
      </div>
    </div>
  )
}
