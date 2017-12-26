import React from 'react';
import { connect } from 'react-redux';

import { changeFilter } from './filters';

const Filters = props => {
    const { changeFilter } = props;
    return (
        <div>
            <p>Filter by: </p>
            <button className="btn btn-default" onClick={() => changeFilter('score')}>
                score
            </button>
            <span> | </span>
            <button className="btn btn-default" onClick={() => changeFilter('date')}>
                date
            </button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    changeFilter: filter => dispatch(changeFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Filters);
