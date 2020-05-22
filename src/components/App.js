import React from 'react';
// import { moviesData } from './settings/MovieData'
import { API_URL, API_KEY_3 } from './settings/api'
import './style.scss';
import MovieItem from './MovieItem';
import MovieTabs from './MovieTabs';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      page: 1,
      total_pages: '',
    };
    this.getPages();
  }

  componentDidMount() {
    // console.log('did mount');
    this.getMovies();
  }
  //Данный метод предоставляет предыдущее и измененное значение пропса и стейта
  componentDidUpdate(prevProps, prevState) {
    // console.log('prev:\t', prevProps, prevState);
    // console.log('this:\t', this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by) {
      // console.log('call api');
      this.getMovies();
    }
    if (prevState.page !== this.state.page) {
      setTimeout(() => {
        this.getMovies();
      })

    }
    let total = this.state.total_pages;
    if (prevState.page === '1' || this.state.page < 1) {
      this.setState({ page: total })
    }
    if (this.state.page === total +1 ) {
      this.setState({ page: 1 })
    }
    console.log(this.state.page);
  }

  getPages = () => {
    this.updateNumberPage();
  }

  getMovies = () => {
    const url = `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`;
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ movies: data.results })
        this.setState({ total_pages: data.total_pages })
      })
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item => {
      return item.id !== movie.id;
    })
    this.setState({ movies: updateMovies })
  };

  addMoviesToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]
    this.setState({ moviesWillWatch: updateMoviesWillWatch })
  }
  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(item => {
      return item.id !== movie.id;
    })
    this.setState({ moviesWillWatch: updateMoviesWillWatch })
  }

  updateSortBy = value => this.setState({ sort_by: value });
  updateNumberPage = (value) => {
    let count = this.state.page;
    if (value === "next") {
      this.setState({ page: count + 1 })
    }
    if (value === "prev") {
      this.setState({ page: count - 1 })
    }
    console.log(value);
  };

  render() {

    return (
      <div className="container">
        <div className='row mt-4'>
          <div className='col-9'>
            <div className='row mb-4'>
            <div className="col-3">
            <h4>Page {"\t" + this.state.page + "\t"} of {"\t" + this.state.total_pages}</h4>
          </div>
              <div className='col-12'>
                <MovieTabs
                  page={this.state.page}
                  totalPage={this.state.total_pages}
                  updateNumberPage={this.updateNumberPage}
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy} />

              </div>
            </div>
            <div className='row'>
              {this.state.movies.map(movie => {
                return (
                  <div className='col-6 mb-4' key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMoviesToWillWatch={this.addMoviesToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col-3'>
            {/* <p>Will watch: {this.state.moviesWillWatch.length}</p> */}
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    {/* <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt="" height='auto' width='40' /> */}
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-3">
            <h4>Page {"\t" + this.state.page + "\t"} of {"\t" + this.state.total_pages}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
