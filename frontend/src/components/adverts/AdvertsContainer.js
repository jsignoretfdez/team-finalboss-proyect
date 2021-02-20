/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getAdverts } from '../../api/adverts';
import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';
// import BasicFilters from './BasicFilters';
import storage from '../../utils/storage';
import { getTags } from '../../api/adverts';

const lastUsedFilters = storage.get('lastUsedFilters');

const AdvertsContainer = ({loadAdverts, loading, error, adverts}) => {
    const [filters, setFilters] = useState(lastUsedFilters || defaultFilters)
    const [isAdvancedFilters, setIsAdvancedFilters] = useState(false);

    const initAdverts = async () => {
        setIsLoading(true);
        try {
            let fetchedAdverts;
            if (lastUsedFilters) {
                fetchedAdverts = await getAdverts(lastUsedFilters);
            } else {
                fetchedAdverts = await getAdverts();
            }
            setAdvertsData(fetchedAdverts.result.rows);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.')
        }
    };

    useEffect(() => {
        initAdverts();
    }, []);

    const handleGetTags = async () => {
        const fetchedTags = await getTags();
        setTags(fetchedTags.result);
    }

    useEffect(() => {
        handleGetTags()
    }, [])

    return (
        <div className="adverts__container">
            <h2 className="adverts__title text-center my-4">Adverts page</h2>
            {hasError ? <p className="general-error-text">{hasError}</p> :
            <>
                <AdvertsFilters tags={tags} />
                {!isLoading && <AdvertsList adverts={adverts} />}
            </>}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    adverts: getAdvertsOnState(state),
    ui: getUi(state),
  }
}

export default connect(mapStateToProps, dispatch => ({
  loadAdverts: (filters) => dispatch(loadAdverts(filters))
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