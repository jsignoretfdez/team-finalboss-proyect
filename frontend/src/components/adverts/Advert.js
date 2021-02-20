/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
const { REACT_APP_API_HOST: IMAGE_BASE_URL } = process.env;

const Advert = ({ ad, hasImage, checkDetail, hasDelete, handleDelete }) => {
    const history = useHistory();
    if (!ad) return;
    console.log(ad)

    return (
        <div className="col-6 mx-auto">
            <div className="card mb-3">
                {hasImage && <img src={ad.image || ad.photo ? `${IMAGE_BASE_URL}${ad.image || ad.photo}` : "https://placedog.net/800"} className="card-img-top" alt={ad.name} />}
                <div className="card-body">
                    <p className="card-text text-center card-title">{ad.name}.</p>
                    <p className="card-text d-flex justify-content-between card-price font-weight-bold">{ad.price} €.
                        <i>{ad.sale ? 'For sale' : 'To buy'}</i>
                    </p>
                    <p>Tags: {ad.tags && ad.tags.join(', ')}</p>
                    {checkDetail && <button type="button" onClick={() => history.push(`/adverts/${ad._id}`)} className="btn btn-secondary">Check details</button>}
                    {hasDelete && <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>}
                </div>
            </div>
        </div>
    )
}

export default Advert;