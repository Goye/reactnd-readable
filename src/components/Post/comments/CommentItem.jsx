import React from 'react';
import CommentForm from './CommentForm';
import moment from 'moment';

class CommentItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            editCommentIsOpen: false,
        };
    }

    componentDidUpdate() {
        if (this.props.dataSaved) {
            this.setState({ editCommentIsOpen: false });
        }
    }

    handleEdit() {
        this.setState({
            editCommentIsOpen: !this.state.editCommentIsOpen,
        });
    }

    render() {
        const { author, body, voteScore, timestamp, id } = this.props.data;
        const date = moment(timestamp).format('ll');
        return (
            <div>
                <p>{author}</p>
                <p>date: {date}</p>
                <p>
                    score:{' '}
                    <span>
                        <button onClick={this.props.handleVoteDown}>-</button>
                        <span> {voteScore} </span>
                        <button onClick={this.props.handleVoteUp}>+</button>
                    </span>
                </p>
                <p>{body}</p>
                <button onClick={this.props.handleEdit}>EDIT COMMENT</button>
                <span> | </span>
                <button onClick={this.props.handleDelete}>DELETE COMMENT</button>
                <hr />
                {this.state.editCommentIsOpen && (
                    <CommentForm id={id} parentId={this.props.parent} body={body} edit={true} />
                )}
                <hr />
            </div>
        );
    }
}

export default CommentItem;
