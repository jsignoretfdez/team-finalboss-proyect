/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';
// import BasicFilters from './BasicFilters';

import { storage, formatFilters } from '../../utils/';
import { getTags, getAdverts } from '../../api/adverts';
import { loadAdverts } from '../../store/actions';
import {
  getAdvertsOnState,
  getUi,
  getTagsOnState,
} from '../../store/selectors';

const lastUsedFilters = storage.get('lastUsedFilters');

const AdvertsContainer = ({ loadAdverts, loading, error, adverts, tags }) => {
  const [filters, setFilters] = useState(lastUsedFilters || defaultFilters);
  const [isAdvancedFilters, setIsAdvancedFilters] = useState(false);

  const handleLoadAdverts = () => {
    // loadAdverts(formatFilters(filters));
  };

  useEffect(() => {
    handleLoadAdverts();
  }, []);

  const handleGetTags = async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags.result);
  };

  useEffect(() => {
    handleGetTags();
  }, []);

  return (
    <div className="adverts__container">
      <h2 className="adverts__title text-center my-4">Adverts page</h2>
      {error ? (
        <p className="general-error-text">{error}</p>
      ) : (
        <>
          <AdvertsFilters tags={tags} />
          {/* {!loading && <AdvertsList adverts={adverts} />} */}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tags: getTagsOnState(state),
    adverts: getAdvertsOnState(state),
    ui: getUi(state),
  };
};

export default connect(mapStateToProps, (dispatch) => ({
  loadAdverts: (filters) => dispatch(loadAdverts(filters)),
}))(AdvertsContainer);

// TODO: Add basic filters as extra

// const Filters = ({isAdvancedFilters, setIsAdvancedFilters}) => {
//     return (
//         <>
//         {!isAdvancedFilters && <BasicFilters />}
//         <button type="button" onClick={() => setIsAdvancedFilters(!isAdvancedFilters)} className="mx-auto d-block btn btn-primary py-2 px-5">
//             {isAdvancedFilters ? "Close" : "Open"} advanced search
//         </button>
//         </>
//     )
// }
