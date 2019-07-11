import * as actionTypes from './actionTypes';
import fetch from 'cross-fetch';

export const setBreedsLoading = () => {
    return {
        type: actionTypes.LOADING_BREEDS
    };
}

export const setBreeds = (breeds) => {
    return {
        type: actionTypes.SET_BREEDS,
        payload: breeds
    };
};

export const fetchBreedsFailed = (error) => {
    return {
        type: actionTypes.FETCH_BREEDS_FAILED,
        payload: "" + error
    };
};


export const loadBreeds = () => {
    return dispatch => {
        dispatch(setBreedsLoading());
        fetch('http://localhost:3001/breeds')
            .then(response => response.json())
            .then(data => {
                dispatch(setBreeds(data));
            })
            .catch(error => {
                dispatch(fetchBreedsFailed(error));
            });
    };
}

