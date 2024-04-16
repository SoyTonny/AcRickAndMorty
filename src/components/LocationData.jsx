import React from 'react'
import './style/LocationData.css'

const LocationData = ({location}) => {

    // console.log(location);

  return (
    <section className='location'>
        <h2 className='location__name'>{location?.name}</h2>
        <ul className='location__lista'>
          <li className='location__element'><span>Tipo: </span><span>{location?.type}</span></li>
          <li className='location__element'><span>Dimencion: </span><span>{location?.dimension}</span></li>
          <li className='location__element'><span>Poblacion: </span><span>{location?.residents.length}</span></li>
        </ul>
      
    </section>
  )
}

export default LocationData
