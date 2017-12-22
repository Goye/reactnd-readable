import React from 'react';
import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';

import CategoryList from '../CategoryList';

import { savePost, editPost, fetchPost } from './post';

class CreateEditPost extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            body: '',
            category: '',
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.fetchPost(this.props.match.params.id);
        }
    }

    componentDidUpdate() {
        this.setState({
            title: this.state.title || this.props.post.title,
            body: this.state.body || this.props.post.body,
        });
    }

    handleChange = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { savePost } = this.props;
        const post = {
            id: uuidv1(),
            timestamp: Date.now(),
            ...this.state,
        };
        savePost(post);
    };

    handleEditSubmit = event => {
        event.preventDefault();
        const { editPost } = this.props;
        const post = {
            title: this.state.title,
            body: this.state.body,
        };
        editPost(post, this.props.match.params.id, this.props.post.category);
    };

    render() {
        const { match } = this.props;
        const { title, body, author } = this.state;
        return (
            <div>
                <header className="App-header">
                    <CategoryList />
                    <hr />
                </header>
                <h3>{match.params.id ? 'Edit post' : 'Create new post'}</h3>
                <form onSubmit={match.params.id ? this.handleEditSubmit : this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title:</label>{' '}
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <label htmlFor="body">body:</label>{' '}
                        <textarea
                            name="body"
                            cols="30"
                            rows="10"
                            value={body}
                            onChange={this.handleChange}
                        />
                    </p>
                    {!match.params.id && (
                        <p>
                            <label htmlFor="author">author:</label>{' '}
                            <input
                                type="text"
                                name="author"
                                value={author}
                                onChange={this.handleChange}
                            />
                        </p>
                    )}
                    {!match.params.id && (
                        <p>
                            <input
                                type="radio"
                                name="category"
                                value="react"
                                onChange={this.handleChange}
                            />{' '}
                            react<br />
                            <input
                                type="radio"
                                name="category"
                                value="redux"
                                onChange={this.handleChange}
                            />{' '}
                            redux<br />
                            <input
                                type="radio"
                                name="category"
                                value="udacity"
                                onChange={this.handleChange}
                            />{' '}
                            udacity<br />
                        </p>
                    )}

                    <button className="btn btn-default">submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    post: state.post.postDetail,
});

const mapDispatchToProps = dispatch => ({
    savePost: post => dispatch(savePost(post)),
    editPost: (post, id, category) => dispatch(editPost(post, id, category)),
    fetchPost: id => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);
