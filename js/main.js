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

require(['requireFiles/Movie', 'requireFiles/Director', 'Topic4', 'jquery', 'jquery.mobile'],
  function(Movie, Director, Topic4) {
    var topic4 = new Topic4();
    topic4.init();
});