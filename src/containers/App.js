import React, { Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: '',
    }
  }

  async componentDidMount() {
    const usersData = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersData.json();

    this.setState({ robots: users });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return !robots.length 
      ? <h1>Loading</h1>
      : (<div className="tc">
            <h1 className="f1">Robofriends</h1>
            <SearchBox searchChange={this.onSearchChange} searchField={searchField} />
            <Scroll>
              <CardList list={filteredRobots} />
            </Scroll>
          </div>)
  }
}

export default App;
