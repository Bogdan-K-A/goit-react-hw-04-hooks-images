import { useEffect } from 'react'

import PropTypes from 'prop-types'
import s from './Modal.module.css'

export default function Modal({ onClick, largImageURL }) {
  /* ------------------------- методы жизненного цикла в которые записаны слушатели событий ------------------------ */
  useEffect(() => {
    window.addEventListener('keydown', closeModal)
  }, [])

  /* ------------- функция закрытия модалки по нажатию на Escape переданная через пропс ------------ */
  const closeModal = (e) => {
    if (e.code === 'Escape') {
      onClick()
    }
  }
  return (
    <div className={s.Overlay} onClick={onClick}>
      <div className={s.Modal}>
        <img src={largImageURL} alt="" />
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  largImageURL: PropTypes.string.isRequired,
}
