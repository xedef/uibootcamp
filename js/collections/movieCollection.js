define(['../models/movieModel'], function(MovieModel) {
  var MovieCollection = Backbone.Collection.extend({

    model: MovieModel

  });

  return MovieCollection;
});