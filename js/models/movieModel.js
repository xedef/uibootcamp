define(['backbone'], function() {
  var MovieModel = Backbone.Model.extend({

    defaults: {
      name: 'untitled movie'
    }

  });

  return MovieModel;
});