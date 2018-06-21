import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => ({
  searchField: state.searchField
});

const mapDispatchToProps = dispatch => ({
  onSearchChange: event => dispatch(setSearchField(event.target.value))
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
    }
  }

  async componentDidMount() {
    const usersData = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersData.json();

    this.setState({ robots: users });
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return !robots.length 
      ? <h1>Loading</h1>
      : (<div className="tc">
            <h1 className="f1">Robofriends</h1>
            <SearchBox searchChange={onSearchChange} searchField={searchField} />
            <Scroll>
              <ErrorBoundary>
                <CardList list={filteredRobots} />
              </ErrorBoundary>
            </Scroll>
          </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
