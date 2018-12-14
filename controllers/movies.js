const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('1d90c823b40f99d5eca65696e3d3c763')
const Review = require('../models/review.js')
module.exports = function(app) {

app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then(response => {
      res.render('movies-index', { movies: response.results });
    }).catch(console.error)
});


// app.get('/movies/:id', (req, res) => {
//     moviedb.movieInfo({ id: req.params.id }).then(movie => {
//         moviedb.movieTrailers({ id: req.params.id }).then(videos => {
//       movie.trailer_youtube_id = videos.youtube[0].source
//       console.log('movie.trailer', videos.trailer_youtube_id)
//
//       res.render('movies-show', { movie: movie });
//     }).catch(console.error);
//   }).catch(console.error);
// });
// }

app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            // check if there is a movie trailer available
            if (movie.video) {
                moviedb.movieVideos({ id: req.params.id }).then(videos => {
                    movie.trailer_youtube_id = videos.results[0].key
                    renderTemplate(movie)
                })
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie)  {
                Review.find({ movieId: req.params.id}).then(reviews => {
                    res.render('movies-show', { movie: movie, reviews: reviews });
                })
            }

        }).catch(console.error)
    })
}
