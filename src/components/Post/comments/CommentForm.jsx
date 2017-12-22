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
    }

    handleChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { saveComment, onCommentAdded } = this.props;
        const comment = {
            id: uuidv1(),
            timestamp: Date.now(),
            ...this.state,
        };
        saveComment(comment);
        onCommentAdded();
    };

    handleEditSubmit = event => {
        event.preventDefault();
        const { editComment, onCommentUpdated } = this.props;
        const comment = {
            timestamp: Date.now(),
            body: this.state.body,
        };
        editComment(comment, this.props.id);
        onCommentUpdated();
    };

    render() {
        const { edit } = this.props;
        const { author, body } = this.state;
        return (
            <form onSubmit={edit ? this.handleEditSubmit : this.handleSubmit}>
                {!edit && (
                    <p>
                        <label htmlFor="author">name:</label>{' '}
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={this.handleChange}
                        />
                    </p>
                )}
                <p>
                    <label htmlFor="body">comment: </label>{' '}
                    <textarea
                        name="body"
                        cols="30"
                        rows="10"
                        value={body}
                        onChange={this.handleChange}
                    />
                </p>
                <button className="btn btn-default">submit</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveComment: comment => dispatch(saveComment(comment)),
    editComment: (comment, id) => dispatch(editComment(comment, id)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
