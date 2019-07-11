import * as actionTypes from './actionTypes';
import fetch from 'cross-fetch';

export const setSubbreedsLoading = () => {
    return {
        type: actionTypes.LOADING_SUBBREEDS
    };
}

export const setSubbreeds = (breedId, subbreeds) => {
    return {
        type: actionTypes.SET_SUBBREEDS,
        payload: {
            breedId: breedId,
            subbreeds: subbreeds
        } 
    };
};

export const fetchSubbreedsFailed = (error) => {
    return {
        type: actionTypes.FETCH_SUBBREEDS_FAILED,
        payload: "" + error
    };
};


export const loadSubbreeds = (breedId) => {
    return dispatch => {
        dispatch(setSubbreedsLoading());
        fetch('http://localhost:3001/breeds/' + breedId + '/subbreads')
            .then(response => response.json())
            .then(data => {
                dispatch(setSubbreeds(breedId, data));
            })
            .catch(error => {
                dispatch(fetchSubbreedsFailed(error));
            });
    };
}
