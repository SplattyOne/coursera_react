import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

class Main extends Component {

    // Mount:
    // constructor()
    // getDerivedStateFromProps()
    // render()
    // componentDidMount()

    // Update:
    // getDerivedStateFromProps()
    // shouldComponentUpdate()
    // render()
    // getSnapshotBeforeUpdate()
    // componentDidUpdate()

    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promote) => promote.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithID = ({match}) => { // { match, component, history }
            return (
                <DishDetail
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishID, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishID === parseInt(match.params.dishID, 10))}
                />
            );
        }

        const AboutPage = () => {
            return (
                <About
                    leaders={this.props.leaders}
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishID' component={DishWithID} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={AboutPage} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
