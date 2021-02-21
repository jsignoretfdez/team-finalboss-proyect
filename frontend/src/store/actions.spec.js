import * as types from './types';
import * as actions from './actions';
import * as advertsApi from '../api/adverts';

jest.mock('../api/adverts');

describe('advertsLoaded', () => { // Sync action
    test('should create a ADVERTS_LOADED action with adverts', () => {
        const adverts = ['1', '2'];
        const expectedAction = {
            type: types.ADVERTS_LOADED,
            payload: adverts,
        };
        const action = actions.advertsLoaded(adverts);
        expect(action).toEqual(expectedAction);
    });
});

describe('loadAdverts', () => { // Async action
    test('should dispatch a ADVERTS_LOADED action', async () => {
        const fetchedAdverts = { result: { rows: ['advert 1', 'advert 2'] } };
        // const advertsToSave = ['advert 1', 'advert 2'];
        const thunkAction = actions.loadAdverts();
        const dispatch = jest.fn(); // mock function
        advertsApi.getAdverts.mockResolvedValue(fetchedAdverts);
        await thunkAction(dispatch);

        expect(advertsApi.getAdverts).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({
            type: types.ADVERTS_LOADED,
            payload: fetchedAdverts.result.rows,
        });
    });
});