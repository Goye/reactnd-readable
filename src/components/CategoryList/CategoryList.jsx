import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from './categoryList';

const CategoryItem = props => {
    const { path, name } = props.data;
    return (
        <span>
            <Link to={`/${path}`}>{name}</Link> |{' '}
        </span>
    );
};

class CategoryList extends React.PureComponent {
    componentDidMount() {
        this.props.fetchCategories();
    }
    renderCategories(category) {
        return <CategoryItem key={category.name} data={category} />;
    }
    render() {
        const { categories } = this.props;
        return (
            <nav className="navbar navbar-default text-center">
                <div>
                    <span>
                        <Link to="/">home</Link> |{' '}
                    </span>
                    {categories.map(this.renderCategories)}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
