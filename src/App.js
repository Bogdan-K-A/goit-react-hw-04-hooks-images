import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Searchbar from './Component/Searchbar/Searchbar'
import Spinner from './Component/Spinner/Spinner'
import ImageGallery from './Component/ImageGallery/ImageGallery'
import fetchAPI from '../src/Servise/imagesApi'
import Button from './Component/Button/Button'
import Modal from './Component/Modal/Modal'
import MapperApi from './Component/helper/mapper'

export default function App() {
  const [searchinput, setSearchinput] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)
  const [result, setResult] = useState([])
  const [largImageURL, setLargImageURL] = useState('')

  /* -------------------- Сравнение запроса при  обновлении ------------------- */
  useEffect(() => {
    if (!searchinput || !page) {
      return
    }
    imgFatchApi()
  }, [searchinput, page])

  /* -------------------------- функция фетч запроса -------------------------- */
  const imgFatchApi = () => {
    setStatus('panding')
    /* ------------------- передаём в функцию два аргумента которые будут передавать значения imagesApi ------------------ */
    fetchAPI(searchinput, page)
      /* ---------------- В аргумент then вписываем произволное имя в это имя передаётся response.json() --------------- */
      .then((images) => {
        if (images.total === 0) {
          setError(`Нет картинок по запросу ${searchinput}`)
          setStatus('rejected')
        } else {
          setResult((result) => [...result, ...MapperApi(images.hits)])

          /* ---------------- проскроливает после нажатия загрузить ещё --------------- */
          handleSroll()
        }
      })
      .catch((error) => {
        setError(error)
        setStatus('rejected')
      })
      .finally(() => {
        setStatus('rejected')
      })
  }

  /* ------------------------ Функция прокрутки ------------------------ */
  const handleSroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }
  /* ------------------------ Функция открытия модалки ------------------------ */
  // передаём в функцию аргумент url в который будет записан пропс в компоненте модалки
  const handelOpenModal = (url) => {
    setLargImageURL(url)
  }

  /* ------------------------ функция закрытия модалки ------------------------ */
  const handelCloseModal = () => {
    setLargImageURL('')
  }

  /* ------------------------- функция запроса в форме ------------------------- */
  const handelSearchSubmitForm = (imagesName) => {
    /* -------------- очищает поля стейта перед следующим запросом -------------- */
    return setSearchinput(imagesName), setResult([]), setPage(1)
  }

  /* ---------------------- Функция кнопки загрузить ещё ---------------------- */
  const handelLoadMore = () => {
    /* ----------------- добавляет новую страницу к существующей ---------------- */
    setPage(page + 1)
  }

  return (
    <div>
      <Searchbar onSubmit={handelSearchSubmitForm} />

      {status === 'panding' && <Spinner />}

      {result.length > 0 && (
        <>
          <ImageGallery onModalOpen={handelOpenModal} result={result} />
          <Button onLoadMore={handelLoadMore} />
        </>
      )}

      {largImageURL && (
        <Modal largImageURL={largImageURL} onClick={handelCloseModal} />
      )}

      {error && <p>{error}</p>}

      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  )
}
