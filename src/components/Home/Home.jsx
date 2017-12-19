import React from 'react';

import CategoryList from '../CategoryList';
import PostsList from '../PostsList';
import Filters from '../Filters';
import { Link } from 'react-router-dom';


class Home extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <CategoryList />
          <Link to="/post/new">Create post</Link>
          <hr/>
          <Filters />
        </header>
        <hr/>
        <h2>Posts</h2>
        <PostsList />
      </div>
    );
  }
}

export default Home;
