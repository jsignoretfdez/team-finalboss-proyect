/* eslint-disable react/prop-types */
import React from 'react';
import Advert from './Advert';

const AdvertsList = ({adverts}) => {
  
  return (
    <div className="adverts">
      <h2 className="adverts__title text-center my-4">Adverts List</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
          {adverts && adverts.map(ad => {
              return (
                  <Advert key={ad._id} ad={ad} checkDetail={true} />
              )})
          }
      </div>
    </div>
  )
}

export default AdvertsList;