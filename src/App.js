import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Movie from './components/Movie';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: {},
      images: {},
      genres: {},
      loading: false
    }
  }

  componentWillMount() {
    this.state.loading = true
    const nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key=6547f8d13335a379d104582c87dab7f3'
    const genres = 'http://api.themoviedb.org/3/genre/movie/list?api_key=6547f8d13335a379d104582c87dab7f3'
    const configuration = 'http://api.themoviedb.org/3/configuration?api_key=6547f8d13335a379d104582c87dab7f3'
    Promise.all([
      axios.get(nowPlaying)
        .then(data => {
          this.state.movies = data.data.results
        }),
      axios.get(genres)
        .then(data => {
          data.data.genres.forEach(genre => {
            this.state.genres[genre.name] = {
              id: genre.id,
              activeFilter: false
            }
          })
        }),
      axios.get(configuration)
        .then(data => {
          this.state.configuration = data.data.images
        })
    ])
      .then(_ => {
        this.setState({loading: false})
        for(let movie of this.state.movies) {
          movie.poster_url = this.state.configuration.base_url + this.state.configuration.poster_sizes[2] + movie.poster_path
        }
      })
  }

  handleGenreChange(genre, checked) {
    let target = { ...this.state.genres }
    switch (checked) {
      case true:
        target[genre].activeFilter = false
        this.setState({genres: target})
        break
      case false:
        target[genre].activeFilter = true
        this.setState({genres: target})
        break
    }
  }

  handleRatingChange() {

  }

  render() {
    return (
      this.state.loading ? <CircularProgress style={{ color: purple[500] }} thickness={7} /> : (
      <div className="App container">
        <div className='row'> 
          <div className='col-sm-12'> 
            <div className="App-header">
              <img src='https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg' className="App-logo" alt="logo" />
              <p>
                See now showing movies in theatres
              </p>
            </div>
          </div>
          <div className='col-sm-12'>
            <div id='genresContainer'>
              <div className='filterHeader'>Filter by genre</div>
              {
                Object.keys(this.state.genres).map(genre => (
                  <FormControlLabel control={<Checkbox
                    checked={this.state.genres[genre]['activeFilter']}
                    onChange={this.handleGenreChange.bind(this, genre, this.state.genres[genre]['activeFilter'])}
                  />} label={genre} />
                ))
              }
            </div>
            <div id='ratingContainer'>
              <div className='filterHeader'>Filter by rating</div>
                <Slider
                  value={3}
                  min={0}
                  max={10}
                  step={0.5}
                  onChange={this.handleRatingChange}
                />
            </div>
            <div id='moviesContainer'>
              <Movie genres={this.state.genres} data={this.state.movies}></Movie>
            </div>
          </div>
        </div>
      </div>
      )
    );
  }
}

export default App;
