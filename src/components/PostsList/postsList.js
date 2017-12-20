import { fetchApiData, deleteApiData, sendApiData } from '../../utils/api';

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const FETCH_CATEGORY_POSTS_SUCCESS = 'FETCH_CATEGORY_POSTS_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

export const fetchPosts = () => {
    return async dispatch => {
        try {
            const res = await fetchApiData('/posts');
            dispatch(fetchPostsSuccess(res.data));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const fetchCategoryPosts = category => {
    return async dispatch => {
        try {
            const res = await fetchApiData(`/${category}/posts`);
            dispatch(fetchCategoryPostSuccess(res.data));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const deletePost = (id, path) => {
    return async dispatch => {
        try {
            await deleteApiData(`/posts/${id}`);
            if (path === '/') {
                return dispatch(fetchPosts());
            }
            return dispatch(fetchCategoryPosts(path.slice(1)));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

export const vote = (option, id, type, path) => {
    return async dispatch => {
        try {
            await sendApiData(`/${type}/${id}`, option);
            if (path === '/') {
                return dispatch(fetchPosts());
            }
            return dispatch(fetchCategoryPosts(path.slice(1)));
        } catch (error) {
            dispatch(requestError(error));
        }
    };
};

const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    error: false,
    posts,
});

const fetchCategoryPostSuccess = posts => ({
    type: FETCH_CATEGORY_POSTS_SUCCESS,
    error: false,
    posts,
});

const requestError = error => {
    console.error(error);
    return {
        type: REQUEST_FAILURE,
        error: true,
    };
};

export default function reducer(state = { posts: [], error: false }, action) {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return { ...state, posts: action.posts, error: false };
        case FETCH_CATEGORY_POSTS_SUCCESS:
            return { ...state, posts: action.posts, error: false };
        case REQUEST_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}
