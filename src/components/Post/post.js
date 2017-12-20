import { fetchApiData, deleteApiData, sendApiData } from '../../utils/api';
import { push } from 'react-router-redux';

const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

export const fetchPost = id => {
    return async dispatch => {
        try {
            const res = await fetchApiData(`/posts/${id}`);
            if (Object.keys(res.data).length) {
                return dispatch(fetchPostSuccess(res.data));
            }
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const fetchPostSuccess = comments => ({
    type: FETCH_POST_SUCCESS,
    comments,
});

export const deletePost = id => {
    return async dispatch => {
        try {
            const res = await deleteApiData(`/posts/${id}`);
            if (res) {
                dispatch(push('/'));
            }
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const vote = (option, id, type) => {
    return async dispatch => {
        try {
            await sendApiData(`/${type}/${id}`, option);
            dispatch(fetchPost(id));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

const requestError = error => {
    console.error(error);
    return {
        type: REQUEST_FAILURE,
        error: true,
    };
};

export default function reducer(state = { postDetail: {}, error: false }, action) {
    switch (action.type) {
        case FETCH_POST_SUCCESS:
            return { ...state, postDetail: action.post, error: false };
        case REQUEST_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}
