/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAdverts } from '../../api/adverts';
import storage from '../../utils/storage';
import removeEmptyFields from '../../utils/removeEmptyFields'; 
import RangeSlider from '../globals/RangeSlider';

const pricesRange = [0, 10000]

const AdvertsFilters = ({tags}) => {
    const { register, handleSubmit } = useForm();
    const [priceValue, setPriceValue] = useState(pricesRange);

    const formatFilters = (filters) => {
      if (filters.tags) {
          filters.tags = filters.tags.join(',')
      }
      const adaptedPriceRange = `${priceValue[0]}-${priceValue[1]}`;
      filters.price = adaptedPriceRange
      return removeEmptyFields(filters)
    }

    const onSubmit = async (filtersData) => {
      // TODO: Add action and reducers to get adverts
      // setIsLoading(true);
      // console.log(filtersData)
      // let formattedData = { ...filtersData }
      // if (filtersData) formattedData = formatFilters(filtersData, priceValue);
      // const lastUsedFilters = { ...formattedData };
      // console.log("data formatted", formattedData)
      // return await getAdverts(formattedData)
      //     .then(fetchedAdverts => {
      //         console.log("fetchedAdverts", fetchedAdverts)
      //         storage.set('lastUsedFilters', lastUsedFilters);
      //         setAdvertsData(fetchedAdverts.result.rows);
      //         setIsLoading(false);
      //     })
      //     .catch(err => {
      //         setIsLoading(false);
      //         setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
      //     })
    };

    const handlePriceRange = (event, newValue) => {
      setPriceValue(newValue);
    };

    return (
      <div className="adverts__filters">
          <h3 className="adverts__subtitle text-center my-4">Advanced Filters</h3>
          <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
              <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" ref={register} />
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                  <p className="mb-0">Sale or buy?</p>
                  <div className="d-flex align-items-center mx-2">
                      <label className="mb-0 mr-2" htmlFor="sale">Sale</label>
                      <input type="radio" name="sale" value="true" ref={register} />
                  </div>
                  <div className="d-flex align-items-center mx-2">
                      <label className="mb-0 mr-2" htmlFor="buy">Buy</label>
                      <input type="radio" name="sale" value="false" ref={register} />
                  </div>
                  <div className="d-flex align-items-center mx-2">
                      <label className="mb-0 mr-2" htmlFor="all">All</label>
                      <input type="radio" name="sale" value="" ref={register} />
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="price">Price range</label>
                  <RangeSlider className="price-range" min={pricesRange[0]} max={pricesRange[1]} value={priceValue} valueLabelDisplay="auto" 
                      aria-labelledby="range-slider" onChange={handlePriceRange} 
                      marks={[{ value: pricesRange[0], label: pricesRange[0] + '€' }, { value: pricesRange[1], label: pricesRange[1] + '€'}]} />
              </div>
              <div className="form-group d-flex align-items-center justify-content-center">
                  <p className="mb-0">Tags</p>
                  {tags?.map(tag => (
                      <div key={tag} className="d-flex align-items-center mx-2">
                          <label className="mb-0 mr-2" htmlFor={tag}>{tag}</label>
                          <input type="checkbox" name="tags" value={tag} ref={register} />
                      </div>
                  ))}
              </div>
              <button type="submit" className="btn btn-primary btn-filters py-2 px-5">Apply filters</button>
          </form>
      </div>
    )
}

export default AdvertsFilters;