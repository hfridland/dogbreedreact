import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    breedId: -1,
    loading: false,
    error: '',
    subbreeds: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_SUBBREEDS:
            return updateObject(state, {
                breedId: -1,
                loading: true,
                error: '',
                subbreeds: null
            });
        case actionTypes.FETCH_SUBBREEDS_FAILED:
            return updateObject(state, {
                breedId: -1,
                loading: false,
                error: action.payload,
                subbreeds: null
            });
        case actionTypes.SET_SUBBREEDS:
            return updateObject(state, {
                breedId: action.payload.breedId,
                loading: false,
                error: '',
                subbreeds: action.payload.subbreeds
            });

        default:
            return state;
    }
}

export default reducer;