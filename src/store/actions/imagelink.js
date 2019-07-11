import * as actionTypes from './actionTypes';
import fetch from 'cross-fetch';

export const setImagelinkLoading = () => {
    return {
        type: actionTypes.LOADING_IMAGELINK
    };
}

export const setImagelink = (imagelink) => {
    return {
        type: actionTypes.SET_IMAGELINK,
        payload: imagelink.img_filename
    };
};

export const fetchImagelinkFailed = (error) => {
    return {
        type: actionTypes.FETCH_IMAGELINK_FAILED,
        payload: "" + error
    };
};


export const loadImagelink = (breedId, subbread) => {
    return dispatch => {
        dispatch(setImagelinkLoading());
        fetch('http://localhost:3001/breeds/' + breedId + '/subbread/' + subbread + '/getimagelink')
            .then(response => response.json())
            .then(data => {
                dispatch(setImagelink(data));
            })
            .catch(error => {
                dispatch(fetchImagelinkFailed(error));
            });
    };
}
