import React from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { saveComment, editComment } from './comments';

class CommentForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            body: this.props.body || '',
            parentId: this.props.parentId,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const comment = {
            id: uuidv1(),
            timestamp: Date.now(),
            ...this.state,
        };
        this.props.saveComment(comment);
    }

    handleEditSubmit(event) {
        event.preventDefault();
        const comment = {
            timestamp: Date.now(),
            body: this.state.body,
        };
        this.props.editComment(comment, this.props.id);
    }

    render() {
        return (
            <form onSubmit={this.props.edit ? this.handleEditSubmit : this.handleSubmit}>
                {!this.props.edit && (
                    <p>
                        <label htmlFor="author">name:</label>
                        <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleChange}
                        />
                    </p>
                )}
                <p>
                    <label htmlFor="body">comment: </label>
                    <textarea
                        name="body"
                        cols="30"
                        rows="10"
                        value={this.state.body}
                        onChange={this.handleChange}
                    />
                </p>
                <button>submit</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveComment: comment => dispatch(saveComment(comment)),
    editComment: (comment, id) => dispatch(editComment(comment, id)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
