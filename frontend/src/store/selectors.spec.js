import * as selectors from './selectors';

describe('getAdvertsOnState', () => { // Selectors test
    test('should return an array', () => {
        const state = {
            adverts: ['advert 1', 'advert 2'],
        };
        expect(Array.isArray(selectors.getAdvertsOnState(state))).toBe(true);
    });

    test('should return null', () => {
        const state = {
            adverts: null,
        };
        expect(selectors.getAdvertsOnState(state)).toBe(null);
    });
});
