import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: '',
    breeds: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_BREEDS:
            return updateObject(state, {
                loading: true,
                error: '',
                breeds: null
            });
        case actionTypes.FETCH_BREEDS_FAILED:
            return updateObject(state, {
                loading: false,
                error: action.payload,
                breeds: null
            });
        case actionTypes.SET_BREEDS:
            return updateObject(state, {
                loading: false,
                error: '',
                breeds: action.payload
            });

        default:
            return state;
    }
}

export default reducer;