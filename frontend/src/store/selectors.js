export const getLoggedUserToken = state => state.auth;

export const getAdvertsOnState = state => state.adverts ? state.adverts : null

export const getAdvertOnState = state => state.advert ? state.advert : null;

export const getTagsOnState = state => state.tags ? state.tags : null;

export const getUi = state => state.ui;