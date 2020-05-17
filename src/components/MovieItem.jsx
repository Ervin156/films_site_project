import React from 'react'

class MovieItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            willWatch: false
        }
    }
    render() {
        const { movie, addMoviesToWillWatch, removeMovie, removeMovieFromWillWatch } = this.props;
        // console.log(addMoviesToWillWatch);
        return (
            /* <button onClick={removeMovie.bind(this, movie)}>Remove movie</button> */
            /* </div> */
            <div className="card">
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} alt="" />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {movie.vote_average}</p>

                        {this.state.willWatch === true ?
                            (<button type="button" className="btn btn-success btn-sm"
                                onClick={() => {
                                    this.setState({ willWatch: false });
                                    removeMovieFromWillWatch(movie);
                                }}>Remove Watch</button>) : (
                                <button type="button" className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                        this.setState({ willWatch: true });  
                                        addMoviesToWillWatch(movie);
                                    }}>Will Watch</button>
                            )}
                        {/* В ф-цию  MovieItem привязывяем контекст из Арр через bind и передаем в addMoviesToWillWatch() аргкментом movie */}

                    </div>
                    {/* В ф-цию  MovieItem привязывяем контекст из Арр через bind и передаем в removeMovie() аргкментом movie */}
                    <button className="btn btn-outline-primary btn-sm" onClick={removeMovie.bind(null, movie)}>Remove movie</button>
                </div>
            </div >
        )
    }
}
export default MovieItem;