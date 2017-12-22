import React from 'react';
import { connect } from 'react-redux';

import { changeFilter } from './filters';

class Filters extends React.PureComponent {
    changeFilter = type => {
        this.props.changeFilter(type);
    };

    render() {
        return (
            <div>
                <p>Filter by: </p>
                <button className="btn btn-default" onClick={() => this.changeFilter('score')}>
                    score
                </button>
                <span> | </span>
                <button className="btn btn-default" onClick={() => this.changeFilter('date')}>
                    date
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeFilter: filter => dispatch(changeFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Filters);
