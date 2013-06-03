var DownloadableMovie = Object.create(Movie);

DownloadableMovie.download = function(){
  console.log('downloading ' + this.get('title'));
};

/*
--------------------------------------------------------------------------------
*/

var DownloadableMovieModule = (function(){

  var download = function(){
    console.log('downloading ' + this.get('title')) ;
  };

    return $.extend(new MovieModule(), {download: download});
});

