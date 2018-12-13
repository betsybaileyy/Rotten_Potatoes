const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('1d90c823b40f99d5eca65696e3d3c763')
module.exports = function(app) {

app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      res.render('movies-index', { movies: response.results });
    }).catch(console.error)
});


app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
        moviedb.movieTrailers({ id: req.params.id }).then(videos => {
      movie.trailer_youtube_id = videos.youtube[0].source
      console.log('movie.trailer_youtube_id', videos.trailer_youtube_id)

      res.render('movies-show', { movie: movie });
    }).catch(console.error);
  }).catch(console.error);
});
}
