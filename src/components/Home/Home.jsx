import React from 'react';

import CategoryList from '../CategoryList';
import PostsList from '../PostsList';
import Filters from '../Filters';
import { Link } from 'react-router-dom';

const Home = ({ match }) => {
    return (
        <div className="App">
            <header className="App-header">
                <CategoryList />
                <Link to="/post/new">Create post</Link>
                <hr />
                <Filters />
            </header>
            <hr />
            <h3>Posts</h3>
            {match && match.params.category ? (
                <PostsList filter={match.params.category} />
            ) : (
                <PostsList />
            )}
        </div>
    );
};

export default Home;
