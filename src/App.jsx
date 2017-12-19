import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Category from './components/Category';
import Post from './components/Post';
import CreateEditPost from './components/CreateEditPost';

class App extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/post/new" component={CreateEditPost} />
                <Route path="/post/:id/edit" component={CreateEditPost} />
                <Route path="/:category/:id" component={Post} />
                <Route path="/:category" component={Category} />
            </Switch>
        );
    }
}

export default App;
