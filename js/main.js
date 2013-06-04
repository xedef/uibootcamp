requirejs.config({
  paths: {
    'jquery': 'thirdparty/jquery-1.9.1',
    'jquery.mobile': 'thirdparty/jquery.mobile-1.3.1'
  },
  shim: {
    'jqueryMobile': {
      deps: ['jquery']
    }
  }
});

require(['requireFiles/Movie', 'requireFiles/Director', 'jquery', 'jquery.mobile'], function(Movie, Director) {
  var m  = new Movie();
  m.get('title');

});