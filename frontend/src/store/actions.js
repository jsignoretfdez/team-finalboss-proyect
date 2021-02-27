import * as types from './types';

// import { getLoggedUserToken } from './selectors';

import { auth, adverts } from '../api';

/* REGISTER */

export const authRegisterRequest = () => ({
  type: types.AUTH_REGISTER_REQUEST,
});

export const authRegisterFailure = (error) => ({
  type: types.AUTH_REGISTER_FAILURE,
  error: true,
  payload: error,
});

export const authRegisterSuccess = () => ({
  type: types.AUTH_REGISTER_SUCCESS,
});

export const authRegister = (newUserData) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authRegisterRequest());
    try {
      const token = await api.auth.register(newUserData);
      dispatch(authRegisterSuccess(token));
      history.push('/login');
    } catch (error) {
      dispatch(authRegisterFailure(error));
    }
  };
};

/* LOGIN */

export const authLoginRequest = () => ({
  type: types.AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = (error) => ({
  type: types.AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = (token) => ({
  type: types.AUTH_LOGIN_SUCCESS,
  payload: token,
});

export const authLogin = (crendentials) => {
  return async function (dispatch, getState, { history, api }) {
    dispatch(authLoginRequest());
    try {
      const token = await auth.login(crendentials);
      dispatch(authLoginSuccess(token));
      history.push('/adverts');
    } catch (error) {
      console.error(error);
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: types.AUTH_LOGOUT,
  };
};

/* ADVERTS */

export const generateAdvertError = (error) => {
  return {
    type: types.ADVERT_ERROR,
    error: true,
    payload: error,
  };
};

export const advertsLoaded = (adverts) => {
  return {
    type: types.ADVERTS_LOADED,
    payload: adverts,
  };
};

export const loadAdverts = (filters) => async (dispatch, getState) => {
  const fetchedAdverts = await adverts.getAdverts(filters);
  dispatch(advertsLoaded(fetchedAdverts?.result?.rows));
};

export const advertLoaded = (advert) => {
  return {
    type: types.ADVERT_LOADED,
    payload: advert,
  };
};

export const loadAdvert = (advertId) => async (dispatch, getState) => {
  const fetchedAdvert = await adverts.getAdvert(advertId);
  dispatch(advertLoaded(fetchedAdvert?.result));
};

export const advertCreated = (advert) => {
  return {
    type: types.ADVERT_CREATED,
    payload: {
      advert,
    },
  };
};

export const createAdvert = (advertData) => async (
  dispatch,
  getState,
  { history, api },
) => {
  try {
    const fetchedAdvert = await adverts.createAdvert(advertData);
    dispatch(advertCreated(fetchedAdvert.result));
    history.push(`/adverts/${fetchedAdvert.result._id}`);
  } catch (error) {
    dispatch(generateAdvertError(error));
  }
};

export const advertDeleted = (advert) => {
  return {
    type: types.ADVERT_DELETED,
    payload: {
      advert,
    },
  };
};

export const deleteAdvert = (advertId) => async (dispatch, getState) => {
  const fetchedAdvert = await adverts.deleteAdvert(advertId);
  dispatch(advertDeleted(fetchedAdvert.result));
};

export const resetError = () => {
  return {
    type: types.UI_RESET_ERROR,
  };
};

/* TAGS */

export const tagsLoaded = (tags) => {
  return {
    type: types.TAGS_LOADED,
    payload: tags,
  };
};

export const loadTags = () => async (dispatch, getState) => {
  const fetchedTags = await adverts.getTags();
  dispatch(tagsLoaded(fetchedTags.result));
};
