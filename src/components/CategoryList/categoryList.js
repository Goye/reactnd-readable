import { fetchApiData } from '../../utils/api';

const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => {
    return async dispatch => {
        try {
            const res = await fetchApiData('/categories');
            dispatch(fetchCategoriesSuccess(res));
        } catch (error) {
            dispatch(fetchCategoriesError(error));
        }
    };
};

const fetchCategoriesSuccess = categories => ({
    type: FETCH_CATEGORIES_SUCCESS,
    error: false,
    categories,
});

const fetchCategoriesError = error => {
    console.error(error);
    return {
        type: FETCH_CATEGORIES_FAILURE,
        error: true,
    };
};

export default function reducer(state = { categories: [], error: false }, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: action.categories, error: false };
        case FETCH_CATEGORIES_FAILURE:
            return { ...state, error: true };
        default:
            return state;
    }
}