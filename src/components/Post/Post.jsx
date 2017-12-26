import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, vote } from './post';
import CategoryList from '../CategoryList';
import Comments from './Comment';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import NotFound from '../../NotFound';

class Post extends React.PureComponent {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchPost(this.props.match.params.id);
        }
    }

    handleDelete = () => {
        if (this.props.match) {
            this.props.deletePost(this.props.match.params.id);
        }
    };

    handleVoteScore = (id, type) => {
        this.props.vote({ option: type }, id, 'posts');
    };

    render() {
        const { post: { title, author, timestamp, voteScore, body, id } } = this.props;
        const error = this.props.error || !Object.keys(this.props.post).length ? true : false;
        const date = formatDate(timestamp);
        return (
            <NotFound error={error}>
                <div className="App">
                    <header className="App-header">
                        <CategoryList />
                        <hr />
                    </header>
                    <header className="App-header">
                        <h3>{title}</h3>
                        <p>
                            author: <strong>{author}</strong>
                        </p>
                        <p>
                            date: <strong>{date}</strong>
                        </p>
                        <p>
                            score:{' '}
                            <span>
                                <button
                                    className={'btn-group btn-group-sm'}
                                    onClick={() => this.handleVoteScore(id, 'downVote')}>
                                    -
                                </button>
                                <span> {voteScore} </span>
                                <button
                                    className={'btn-group btn-group-sm'}
                                    onClick={() => this.handleVoteScore(id, 'upVote')}>
                                    +
                                </button>
                            </span>
                        </p>
                        <Link to={`/post/${id}/edit`}>EDIT POST</Link>
                        <span> | </span>
                        <button className={'btn btn-default'} onClick={this.handleDelete}>
                            DELETE POST
                        </button>
                        <hr />
                    </header>
                    <p>{body}</p>
                    <hr />
                    {id && <Comments id={id} />}
                </div>
            </NotFound>
        );
    }
}

const mapStateToProps = state => ({
    post: state.post.postDetail,
    error: state.post.error,
});

const mapDispatchToProps = dispatch => ({
    fetchPost: id => dispatch(fetchPost(id)),
    deletePost: id => dispatch(deletePost(id)),
    vote: (options, id, type) => dispatch(vote(options, id, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
