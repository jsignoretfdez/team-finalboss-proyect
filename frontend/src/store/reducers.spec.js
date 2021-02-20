import * as types from './types';
import * as reducers from './reducers';

describe('adverts reducer', () => { // Reducers test
    test('should handle a ADVERTS_LOADED action', () => {
        const initialState = [];
        const action = {
            type: types.ADVERTS_LOADED,
            payload: ['advert 1', 'advert 2'],
        };
        const expectedState = ['advert 1', 'advert 2'];

        expect(reducers.adverts(initialState, action)).toEqual(expectedState);
    });

    test('should handle ANY action with the default', () => {
        const initialState = [];
        const action = {
            type: 'ANY',
        };
        expect(reducers.adverts(initialState, action)).toEqual(initialState);
    });
});
