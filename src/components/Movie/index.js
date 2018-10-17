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
    return (
      <div>
        {
          this.props.data ? this.props.data.map(movie => {
              for(let genre in this.props.genres) {
                if (this.props.genres[genre].activeFilter == true) {
                  if (movie.genre_ids.includes(this.props.genres[genre].id)) {
                    return (
                      <Card className='card'>
                        <CardActionArea>
                          <img
                            src={movie.poster_url}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className='cardTitle'>
                              {movie.title}
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
              }
            }
          }) : 'There is no card data yet'
        }
      </div>
    );
  }
}

export default App;
