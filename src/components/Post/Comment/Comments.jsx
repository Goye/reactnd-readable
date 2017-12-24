import React from 'react';
import { connect } from 'react-redux';

import { fetchPostComments, deleteComments, vote } from './comments';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

class Comments extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            addCommentIsOpen: false,
        };
    }
    componentDidMount() {
        const { id } = this.props;
        if (id) {
            this.props.fetchPostComments(id);
        }
    }

    componentDidUpdate() {
        const { dataSaved } = this.props;
        if (dataSaved) {
            this.setState({ addCommentIsOpen: false });
        }
    }

    deleteComment = id => {
        this.props.deleteComments(id);
    };

    handleVoteScore = (id, type) => {
        this.props.vote({ option: type }, id, 'comments');
    };

    renderComment = comment => {
        return (
            <CommentItem
                key={comment.id}
                data={comment}
                dataSaved={this.props.dataSaved}
                handleDelete={() => this.deleteComment(comment.id)}
                handleVoteUp={() => this.handleVoteScore(comment.id, 'upVote')}
                handleVoteDown={() => this.handleVoteScore(comment.id, 'downVote')}
            />
        );
    };

    handleAddComment = () => {
        this.setState({ addCommentIsOpen: !this.state.addCommentIsOpen });
    };

    onCommentAdded = () => {
        this.setState({ addCommentIsOpen: false });
    };

    render() {
        const { addCommentIsOpen } = this.state;
        const { comments, id } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <h4>Commets ({comments.length})</h4>
                    <button className={'btn btn-default'} onClick={this.handleAddComment}>
                        ADD COMMENT
                    </button>
                    <hr />
                </header>
                {addCommentIsOpen && (
                    <CommentForm parentId={id} onCommentAdded={this.onCommentAdded} />
                )}
                <hr />
                {comments.map(comment => this.renderComment(comment))}
            </div>
        );
    }
}

function sortComments(a, b) {
    return b.voteScore - a.voteScore;
}

const mapStateToProps = state => ({
    comments: state.comments.postComments.length
        ? state.comments.postComments.sort(sortComments)
        : [],
    dataSaved: state.post.dataSaved,
});

const mapDispatchToProps = dispatch => ({
    fetchPostComments: id => dispatch(fetchPostComments(id)),
    deleteComments: id => dispatch(deleteComments(id)),
    vote: (options, id, type) => dispatch(vote(options, id, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
