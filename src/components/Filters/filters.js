const CHANGE_FILTER = 'CHANGE_FILTER';

export const changeFilter = filter => ({
    type: CHANGE_FILTER,
    filter,
});

export default function reducer(state = { filter: '' }, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return { ...state, filter: action.filter, error: false };
        default:
            return state;
    }
}
