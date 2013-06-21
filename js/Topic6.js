//define(['views/movieList'], function(MovieListView) {
define(['models/movieModel',
        'collections/movieCollection',
        'views/movieList',
        'views/movieListItem'],
        function(MovieModel, MovieCollection, MovieListView, MovieListItemView) {
  function Topic6() {

    var movies = ['Terminator', 'A clockwork orange', 'Back to the future'];

    var init = function() {

      var movies = new MovieCollection();

      movies.add({name: 'Terminator'});
      movies.add({name: 'Back to the future'});
      movies.add({name: 'A clockwork orange'});

      var movieList = new MovieListView( { collection: movies } );
      movieList.render();

    };

    return {
      init: init
    };
  }

  return Topic6;
});