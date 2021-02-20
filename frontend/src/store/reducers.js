import * as types from './types';

const initialState = {
  auth: null,
  adverts: null,
  advert: null,
  tags: null,
  ui: {
    loading: false,
    error: null,
  },
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      // login
      return action.payload; // Save the token on redux state
    case types.AUTH_LOGOUT:
      // logout
      return null;
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_LOADED:
      return action.payload; // On new load, save the passed adverts on the state
    case types.ADVERT_CREATED:
      if (!state) { // check if there is adverts already on state
        return [action.payload.advert]; // If not, save the passed advert on an array
      } // otherwise, concat the adverts on state with the new advert
      return [...state, action.payload];
    case types.ADVERT_DELETED:
      if (!state) { // Check if there is adverts already on state
        return null; // If not, we can't remove any advert
      } // otherwise, filter the removed advert from the state using it's id
      const deletedAdvert = action.payload;
      return state.filter(advert => advert._id !== deletedAdvert._id);
    default:
      return state;
  }
};

export const advert = (state = initialState.advert, action) => {
  switch (action.type) {
    case types.ADVERT_LOADED:
      return action.payload;
    default:
      return state;
  }
}

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_LOADED:
      return action.payload;
    default:
      return state;
  }
}

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST || types.AUTH_REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.AUTH_LOGIN_SUCCESS || types.AUTH_REGISTER_SUCCESS:
      return { ...state, error: null, loading: false };
    case types.UI_RESET_ERROR:
      return { ...state, error: null, loading: false };
    case types.ADVERTS_REQUEST:
      return { ...state, loading: true };
    case types.ADVERTS_SUCCESS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
