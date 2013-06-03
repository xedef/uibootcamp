var DownloadableMovie = Object.create(Movie);

DownloadableMovie.download = function(){
  console.log('downloading ' + this.get('title'));
};

/*
--------------------------------------------------------------------------------
*/

var DownloadableMovieModule = Object.create(MovieModule);
DownloadableMovieModule.download = function(){
  console.log('downloading ' + this.get('title')) ;
};
