// 
import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFech from './hooks/useFech'
import LocationData from './components/LocationData'
import ResidentCard from './components/ResidentCard'

function App () {
  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1)
  const [location, getLocation, isLoading, hasError] = useFech()
  const [currentPage, setCurrentPage] = useState(1)
  const residentsPerPage = 12

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`
    getLocation(url)
  }, [inputValue])

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newInputValue = textInput.current.value.toLowerCase().trim()

    if (!isNaN(newInputValue) && parseInt(newInputValue) > 0) {
      setInputValue(newInputValue)
    } else {
      console.log('Debes proporcionar un número válido y positivo')
    }
    textInput.current.value = ''
  }

 // Calcular índices de los residentes que se mostrarán en la página actual
  const indexOfLastResident = currentPage * residentsPerPage
  const indexOfFirstResident = indexOfLastResident - residentsPerPage
  const currentResidents = location?.residents.slice(indexOfFirstResident, indexOfLastResident)

  // Cambiar de página
  const paginate = pageNumber => {
    // Validar si el número de página está dentro del rango de páginas
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const totalPages = Math.ceil(location?.residents.length / residentsPerPage)

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='app'>
          <img src='../assets/fondeRick.webp' alt='Fondo De Rick y Morty' className='navbar__img' />
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__input' type="text" ref={textInput} placeholder='Ingresa un numero' />
            <button className='app__btn'>Search location</button>
          </form>
          {hasError || inputValue === '0' ? (
            <h2>Hey! you must provide an id from 1 to 126</h2>
          ) : (
            <>
              <LocationData
                location={location}
              />
              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={() => paginate(1)}>Inicio</button>
                  <button onClick={() => paginate(currentPage - 1)}>Anterior</button>
                  <span>{currentPage} de {totalPages}</span>
                  <button onClick={() => paginate(currentPage + 1)}>Siguiente</button>
                  <button onClick={() => paginate(totalPages)}>Ultimo</button>
                </div>
              )}
              <div className='app__container'>
                {currentResidents.map(resident => (
                  <ResidentCard
                    key={resident}
                    url={resident}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button onClick={() => paginate(1)}>Inicio</button>
                  <button onClick={() => paginate(currentPage - 1)}>Anterior</button>
                  <span>{currentPage} of {totalPages}</span>
                  <button onClick={() => paginate(currentPage + 1)}>Siguiente</button>
                  <button onClick={() => paginate(totalPages)}>Final</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default App