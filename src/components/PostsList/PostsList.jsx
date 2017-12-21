import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategoryPosts, vote, deletePost } from './postsList';
import { Link } from 'react-router-dom';

const PostItem = props => {
    const { voteScore, title, commentCount, category, id, author } = props.data;
    const url = `/${category}/${id}`;
    return (
        <div>
            <Link to={url}>{title}</Link>
            <p>author: {author}</p>
            <p>
                Score:{' '}
                <span>
                    <button onClick={props.handleVoteDown}>-</button>
                    <span> {voteScore} </span>
                    <button onClick={props.handleVoteUp}>+</button>
                </span>
            </p>
            <p>Comments: {commentCount}</p>
            <p>
                Category: <a href={category}>{category}</a>
            </p>
            <hr />
            <Link to={`/post/${id}/edit`}>EDIT POST</Link>
            <span> | </span>
            <button onClick={props.handleDelete}>DELETE POST</button>
            <hr />
        </div>
    );
};

class PostsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
    }

    componentDidMount() {
        if (this.props.filter) {
            this.props.fetchCategoryPosts(this.props.filter);
        } else {
            this.props.fetchPosts();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.props.fetchCategoryPosts(this.props.filter);
        }
    }

    handleDelete(id, category) {
        this.props.deletePost(id, category);
    }

    handleVoteScore(id, type) {
        this.props.vote({ option: type }, id, 'posts', this.props.pathName);
    }

    renderPosts(post) {
        return (
            <PostItem
                key={post.id}
                data={post}
                handleDelete={() => this.handleDelete(post.id, this.props.pathName)}
                handleVoteUp={() => this.handleVoteScore(post.id, 'upVote')}
                handleVoteDown={() => this.handleVoteScore(post.id, 'downVote')}
            />
        );
    }

    sortPosts(posts) {
        if (this.props.sort === '' || this.props.sort === 'score') {
            return posts.sort((a, b) => b.voteScore - a.voteScore);
        }
        return posts.sort((a, b) => b.timestamp - a.timestamp);
    }

    render() {
        const sortedPosts = this.sortPosts(this.props.posts);
        return <ul>{sortedPosts && sortedPosts.map(this.renderPosts)}</ul>;
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        sort: state.filter.filter,
        pathName: state.router.location ? state.router.location.pathname : null,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategoryPosts: category => dispatch(fetchCategoryPosts(category)),
    deletePost: (id, path) => dispatch(deletePost(id, path)),
    vote: (options, id, type, path) => dispatch(vote(options, id, type, path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
