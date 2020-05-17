import React from 'react';
import { moviesData } from './settings/MovieData'
import './style.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData,
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.movies.map(movie => <p key={movie.id}>{movie.title}</p>)}
      </div>
    );
  }
}

export default App;
