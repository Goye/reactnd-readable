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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const post = {
            id: uuidv1(),
            timestamp: Date.now(),
            ...this.state,
        };
        this.props.savePost(post);
    }

    handleEditSubmit(event) {
        event.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body,
        };
        this.props.editPost(post, this.props.match.params.id, this.props.post.category);
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <CategoryList />
                    <hr />
                </header>
                <h2>{this.props.match.params.id ? 'Edit post' : 'Create new post'}</h2>
                <form
                    onSubmit={
                        this.props.match.params.id ? this.handleEditSubmit : this.handleSubmit
                    }>
                    <p>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <label htmlFor="body">body:</label>
                        <textarea
                            name="body"
                            cols="30"
                            rows="10"
                            value={this.state.body}
                            onChange={this.handleChange}
                        />
                    </p>
                    {!this.props.match.params.id && (
                        <p>
                            <label htmlFor="author">author:</label>
                            <input
                                type="text"
                                name="author"
                                value={this.state.author}
                                onChange={this.handleChange}
                            />
                        </p>
                    )}
                    {!this.props.match.params.id && (
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

                    <button>submit</button>
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
