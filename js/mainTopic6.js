requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    'jquery': 'thirdparty/jquery-1.9.1',
    'jquery.mobile': 'thirdparty/jquery.mobile-1.3.1',
    'handlebars': 'libs/handlebars',
    'underscore': 'libs/underscore',
    'backbone' : 'libs/backbone'
  },
  shim: {
    'jqueryMobile': {
      deps: ['jquery']
    },
    'underscore': {
      deps: ['jquery']
    },
    'backbone': {
      deps: ['underscore']
    }
  }
});

require(['Topic6', 'jquery', 'jquery.mobile', 'underscore', 'backbone'],
  function(Topic6) {
    var topic6 = new Topic6();
    topic6.init();

});