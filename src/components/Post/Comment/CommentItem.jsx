import React from 'react';
import CommentForm from './CommentForm';
import { formatDate } from '../../../utils/helpers';

class CommentItem extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            editCommentIsOpen: false,
        };
    }

    componentDidUpdate() {
        const { dataSaved } = this.props;
        if (dataSaved) {
            this.setState({ editCommentIsOpen: false });
        }
    }

    handleEdit = () => {
        this.setState({
            editCommentIsOpen: !this.state.editCommentIsOpen,
        });
    };

    onCommentUpdated = () => {
        this.setState({ editCommentIsOpen: false });
    };

    render() {
        const { editCommentIsOpen } = this.state;
        const {
            data: { author, body, voteScore, timestamp, id },
            handleVoteDown,
            handleVoteUp,
            handleDelete,
            parent,
        } = this.props;
        const date = formatDate(timestamp);
        return (
            <div>
                <p>
                    <strong>{author}</strong>
                </p>
                <p>
                    date: <strong>{date}</strong>
                </p>
                <p>
                    score:{' '}
                    <span>
                        <button onClick={handleVoteDown}>-</button>
                        <span> {voteScore} </span>
                        <button onClick={handleVoteUp}>+</button>
                    </span>
                </p>
                <p>{body}</p>
                <button className="btn btn-default" onClick={this.handleEdit}>
                    EDIT COMMENT
                </button>
                <span> | </span>
                <button className="btn btn-default" onClick={handleDelete}>
                    DELETE COMMENT
                </button>
                <hr />
                {editCommentIsOpen && (
                    <CommentForm
                        id={id}
                        parentId={parent}
                        body={body}
                        edit={true}
                        onCommentUpdated={this.onCommentUpdated}
                    />
                )}
            </div>
        );
    }
}

export default CommentItem;
