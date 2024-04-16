import React, { useEffect } from 'react'
import useFech from '../hooks/useFech'
import './style/ResidentCard.css'

const ResidentCard = ({ url }) => {

  const [resident, getResident] = useFech()

  useEffect(() => {
    getResident(url);
  }, [])


  return (
      <article className='card'>
        <figure className='card__img'>
            <img src={resident?.image} alt="Resident Foto" />
          <figcaption className='card__status'>
            <div className={`circulo ${resident?.status}`}></div>
            <span>{resident?.status}</span>
          </figcaption>
        </figure>
        <h3 className='card__name'>{resident?.name}</h3>
        <hr className='rayita'/>
        <ul className='card__lista'>
          <li className='lista__element'><span>Especie: </span><span>{resident?.species}</span></li>
          <li className='lista__element'><span>Origen: </span><span>{resident?.origin.name}</span></li>
          <li className='lista__element'><span>Episodios en los que aparece: </span><span>{resident?.episode.length}</span></li>
        </ul>
      </article>
  )
}

export default ResidentCard
