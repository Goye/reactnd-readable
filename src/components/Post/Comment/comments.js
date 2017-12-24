import { fetchApiData, deleteApiData, sendApiData, updateApiData } from '../../../utils/api';

const FETCH_POSTS_COMMENTS_SUCCESS = 'FETCH_POSTS_COMMENTS_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

export const fetchPostComments = id => {
    return async dispatch => {
        try {
            const res = await fetchApiData(`/posts/${id}/comments`);
            dispatch(fetchPostsCommentsSuccess(res.data));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const fetchPostsCommentsSuccess = comments => ({
    type: FETCH_POSTS_COMMENTS_SUCCESS,
    comments,
});

export const deleteComments = id => {
    return async dispatch => {
        try {
            const res = await deleteApiData(`/comments/${id}`);
            dispatch(fetchPostComments(res.data.parentId));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const vote = (option, id, type) => {
    return async dispatch => {
        try {
            const res = await sendApiData(`/${type}/${id}`, option);
            dispatch(fetchPostComments(res.data.parentId));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const saveComment = comment => {
    return async dispatch => {
        try {
            const res = await sendApiData('/comments', comment);
            dispatch(fetchPostComments(res.data.parentId));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const editComment = (comment, id) => {
    return async dispatch => {
        try {
            const res = await updateApiData(`/comments/${id}`, comment);
            dispatch(fetchPostComments(res.data.parentId));
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

export default function reducer(state = { postComments: {}, error: false }, action) {
    switch (action.type) {
        case FETCH_POSTS_COMMENTS_SUCCESS:
            return { ...state, postComments: action.comments, error: false };
        case REQUEST_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}
