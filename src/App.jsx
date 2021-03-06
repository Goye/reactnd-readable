import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Post from './components/Post';
import CreateEditPost from './components/Post/CreateEditPost';
import NotFound from './NotFound';

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/post/new" component={CreateEditPost} />
                <Route path="/post/:id/edit" component={CreateEditPost} />
                <Route path="/:category/:id" component={Post} />
                <Route path="/:category" component={Home} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default App;
