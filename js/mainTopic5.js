requirejs.config({
  paths: {
    'jquery': 'thirdparty/jquery-1.9.1',
    'jquery.mobile': 'thirdparty/jquery.mobile-1.3.1',
    'handlebars': 'libs/handlebars',
    'underscore': 'libs/underscore',
    'dust' : 'libs/dust-full-0.3.0'
  },
  shim: {
    'jqueryMobile': {
      deps: ['jquery']
    },
    'underscore': {
      deps: ['jquery']
    },
    'dust': {
      deps: ['jquery']
    }
  }
});

require(['Topic5', 'jquery', 'jquery.mobile', 'handlebars','underscore', 'dust'],
  function(Topic5) {
    var topic5 = new Topic5();
    topic5.init();

});