import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as categoriesReducer } from './components/categoryList';
import { reducer as postsReducer } from './components/postsList';
import { reducer as filterReducer } from './components/filters';
import { reducer as postReducer } from './components/post';
import { reducer as commentsReducer } from './components/comments';

export default combineReducers({
    router: routerReducer,
    categories: categoriesReducer,
    posts: postsReducer,
    filter: filterReducer,
    post: postReducer,
    comments: commentsReducer,
});
