import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImSearch } from 'react-icons/im'
import s from './Searchbar.module.css'

function Searchbar({ onSubmit }) {
  const [searchinput, setSearchinput] = useState('')

  /* ---------------------------- Отслеживает запрос в инпуте --------------------------- */
  const handelNameImg = (e) => {
    const { value } = e.currentTarget
    setSearchinput(value.toLowerCase())
  }

  /* ----------------------------- запрос в сабмит и запись в state---------------------------- */
  const handelSubmit = (e) => {
    e.preventDefault()

    /* ---------------- если инпут пустой выпадет предупреждение ---------------- */
    if (searchinput.trim() === '') {
      return toast.error('Введите запрос')
    }
    onSubmit(searchinput)
    /* ------------------- очистка инпута посне нажатия кнопки ------------------ */
    setSearchinput('')
  }

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handelSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <ImSearch style={{ width: 20, height: 20 }} />
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchinput}
          onChange={handelNameImg}
        />
      </form>
    </header>
  )
}

export default Searchbar

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
