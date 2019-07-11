import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: '',
    imagelink: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_IMAGELINK:
            return updateObject(state, {
                loading: true,
                error: '',
                imagelink: null
            });
        case actionTypes.FETCH_IMAGELINK_FAILED:
            return updateObject(state, {
                loading: false,
                error: action.payload,
                imagelink: null
            });
        case actionTypes.SET_IMAGELINK:
            return updateObject(state, {
                loading: false,
                error: '',
                imagelink: action.payload
            });

        default:
            return state;
    }
}

export default reducer;