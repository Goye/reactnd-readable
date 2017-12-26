import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => {
    const { error, children } = props;
    if (!error && children) {
        return <div> {children}</div>;
    } else {
        return (
            <div>
                <h3>404 page not found</h3>
                <p>Sorry, an error has ocurred, requested page not found!</p>
                <Link to="/">Take me home.</Link>
            </div>
        );
    }
};

export default NotFound;
