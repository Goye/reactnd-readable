import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as categoriesReducer } from './components/CategoryList';
import { reducer as postsReducer } from './components/PostsList';
import { reducer as filterReducer } from './components/Filters';
import { reducer as postReducer } from './components/Post';
import { reducer as commentsReducer } from './components/Post/Comments';

export default combineReducers({
    router: routerReducer,
    categories: categoriesReducer,
    posts: postsReducer,
    filter: filterReducer,
    post: postReducer,
    comments: commentsReducer,
});
