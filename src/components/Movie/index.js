import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Movie.css';

class App extends Component {
  render() {
    const { movies, genres, ratingFilter } = this.props
    // sorts movies based on popularity
    movies.sort((a, b) => b.popularity - a.popularity)
    let chosenGenreIDs = []
    for(let genre in genres) {
      if (genres[genre].activeFilter == true) { 
        chosenGenreIDs.push(genres[genre].id)
      }
    }
    const check = movieGenreIDs => {
      //console.log('chosen genre ids:', chosenGenreIDs)
      if (!chosenGenreIDs) {
        return true
      }
      return movieGenreIDs.filter(elem => {
          return chosenGenreIDs.indexOf(elem) > -1;
      }).length == chosenGenreIDs.length  
    }
    return (
      <div>
        {
          movies ? movies.map(movie => {
              if (movie['vote_average'] < ratingFilter) {
                return ''
              }
              if (check(movie['genre_ids'])) {
                return (
                  <Card className='card'>
                    <CardActionArea>
                      <CardContent>
                        <img
                          src={movie.poster_url}
                        />
                        <Typography gutterBottom variant="h5" component="h2" className='cardTitle'>
                          {movie['title']}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" className='cardGenres'>
                          <div id='cardGenreTitle'>Genres:</div>
                          {movie.genre_ids.map(genreID => {
                            for(let genre in genres) {
                              if (genreID == genres[genre].id) {
                                return (<div className='genre'>{genre}</div>)
                              }
                            }
                          })}
                        </Typography>
                        <Typography component="p">
                          {`${movie.overview.substring(0, 130)}...`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                )
            }
          }) : 'There is no card data yet'
        }
      </div>
    );
  }
}

export default App;
